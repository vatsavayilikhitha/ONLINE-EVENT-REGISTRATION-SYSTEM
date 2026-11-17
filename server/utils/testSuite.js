const API_BASE = process.env.API_BASE || 'http://127.0.0.1:5001/api';

const results = [];

const logTest = (id, name, status, details = '') => {
  results.push({ id, name, status, details });
  const symbol = status === 'PASSED' ? '✓' : '✗';
  console.log(`[${symbol}] Test ${id}: ${name} -> ${status} ${details ? '(' + details + ')' : ''}`);
};

async function postJson(endpoint, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function putJson(endpoint, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function getJson(endpoint, token) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'GET',
    headers
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function deleteJson(endpoint, token) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
    headers
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function runTestSuite() {
  console.log('====================================================');
  console.log(' RUNNING END-TO-END AUTOMATED TEST SUITE');
  console.log('====================================================\n');

  let studentToken = '';
  let adminToken = '';
  let createdEventId = '';
  let testRegistrationId = '';

  // 1. User Registration
  try {
    const uniqueEmail = `testuser_${Date.now()}@college.edu`;
    const res = await postJson('/auth/register', {
      name: 'Test Student',
      email: uniqueEmail,
      password: 'StudentPassword123!',
      confirmPassword: 'StudentPassword123!',
      phone: '+1 555-0123',
      college: 'Information Tech'
    });
    if (res.ok && res.data.user?.token) {
      logTest(1, 'User Registration', 'PASSED', `Registered with email: ${uniqueEmail}`);
    } else {
      logTest(1, 'User Registration', 'FAILED', res.data.message || 'Registration failed');
    }
  } catch (err) {
    logTest(1, 'User Registration', 'FAILED', err.message);
  }

  // 2. Invalid Registration (mismatched password)
  try {
    const res = await postJson('/auth/register', {
      name: 'Invalid Student',
      email: 'invalid@college.edu',
      password: 'password1',
      confirmPassword: 'passwordMismatch',
      phone: '+1 555-0123',
      college: 'IT'
    });
    if (res.status === 400) {
      logTest(2, 'Invalid Registration Validation', 'PASSED', 'Properly returned 400 Bad Request');
    } else {
      logTest(2, 'Invalid Registration Validation', 'FAILED', `Expected 400 but got ${res.status}`);
    }
  } catch (err) {
    logTest(2, 'Invalid Registration Validation', 'FAILED', err.message);
  }

  // 3. Duplicate Email Registration
  try {
    const res = await postJson('/auth/register', {
      name: 'Duplicate Student',
      email: 'student@eventhub.edu', // seeded student email
      password: 'Password123!',
      confirmPassword: 'Password123!',
      phone: '+1 555-0000',
      college: 'IT'
    });
    if (res.status === 400) {
      logTest(3, 'Duplicate Email Prevention', 'PASSED', 'Rejected with 400 Duplicate Email error');
    } else {
      logTest(3, 'Duplicate Email Prevention', 'FAILED', `Expected 400 but got ${res.status}`);
    }
  } catch (err) {
    logTest(3, 'Duplicate Email Prevention', 'FAILED', err.message);
  }

  // 4. User Login
  try {
    const res = await postJson('/auth/login', {
      email: 'student@eventhub.edu',
      password: 'StudentPassword123!'
    });
    if (res.ok && res.data.user?.token) {
      studentToken = res.data.user.token;
      logTest(4, 'User Login', 'PASSED', `Authenticated role: ${res.data.user.role}`);
    } else {
      logTest(4, 'User Login', 'FAILED', res.data.message || 'Login failed');
    }
  } catch (err) {
    logTest(4, 'User Login', 'FAILED', err.message);
  }

  // 5. Invalid Login
  try {
    const res = await postJson('/auth/login', {
      email: 'student@eventhub.edu',
      password: 'WrongPasswordXYZ'
    });
    if (res.status === 401) {
      logTest(5, 'Invalid Password Login', 'PASSED', 'Properly returned 401 Unauthorized');
    } else {
      logTest(5, 'Invalid Password Login', 'FAILED', `Expected 401 but got ${res.status}`);
    }
  } catch (err) {
    logTest(5, 'Invalid Password Login', 'FAILED', err.message);
  }

  // 6. Admin Login
  try {
    const res = await postJson('/auth/login', {
      email: 'admin@eventhub.edu',
      password: 'AdminPassword123!'
    });
    if (res.ok && res.data.user?.role === 'admin') {
      adminToken = res.data.user.token;
      logTest(6, 'Admin Login', 'PASSED', 'Admin token granted');
    } else {
      logTest(6, 'Admin Login', 'FAILED', res.data.message || 'Admin login failed');
    }
  } catch (err) {
    logTest(6, 'Admin Login', 'FAILED', err.message);
  }

  // 7. Event Creation (Admin)
  try {
    const eventDate = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000);
    const deadline = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
    const res = await postJson(
      '/events',
      {
        title: 'Full-Stack Software Engineering Summit',
        description: 'Automated test suite demo event for full stack architecture and testing.',
        category: 'Technology and Hackathons',
        date: eventDate.toISOString(),
        startTime: '10:00 AM',
        endTime: '03:00 PM',
        venue: 'Hall 404, Tech Wing',
        organizer: 'Computer Science Department',
        contact: 'summit@college.edu',
        capacity: 50,
        registrationDeadline: deadline.toISOString(),
        price: 0,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'
      },
      adminToken
    );
    if (res.ok && res.data.event?._id) {
      createdEventId = res.data.event._id;
      logTest(7, 'Admin Event Creation', 'PASSED', `Event ID: ${createdEventId}`);
    } else {
      logTest(7, 'Admin Event Creation', 'FAILED', res.data.message || 'Creation failed');
    }
  } catch (err) {
    logTest(7, 'Admin Event Creation', 'FAILED', err.message);
  }

  // 8. Event Editing (Admin)
  try {
    const res = await putJson(
      `/events/${createdEventId}`,
      { title: 'Full-Stack Software Engineering Summit (Updated Title)' },
      adminToken
    );
    if (res.ok && res.data.event?.title.includes('Updated')) {
      logTest(8, 'Admin Event Editing', 'PASSED', 'Title updated');
    } else {
      logTest(8, 'Admin Event Editing', 'FAILED', res.data.message || 'Title was not updated');
    }
  } catch (err) {
    logTest(8, 'Admin Event Editing', 'FAILED', err.message);
  }

  // 9. Event Search
  try {
    const res = await getJson('/events?search=Hackathon');
    if (res.ok && res.data.events?.some((e) => e.title.includes('Hackathon'))) {
      logTest(9, 'Event Search Query', 'PASSED', `Found ${res.data.count} matching events`);
    } else {
      logTest(9, 'Event Search Query', 'FAILED', 'Could not locate Hackathon');
    }
  } catch (err) {
    logTest(9, 'Event Search Query', 'FAILED', err.message);
  }

  // 10. Event Filtering by Category
  try {
    const res = await getJson('/events?category=Technology and Hackathons');
    const allMatching = res.data.events?.every((e) => e.category === 'Technology and Hackathons');
    if (res.ok && allMatching && res.data.count > 0) {
      logTest(10, 'Event Category Filtering', 'PASSED', `Filtered ${res.data.count} events`);
    } else {
      logTest(10, 'Event Category Filtering', 'FAILED', 'Filter returned wrong categories');
    }
  } catch (err) {
    logTest(10, 'Event Category Filtering', 'FAILED', err.message);
  }

  // 11. Successful Event Registration
  try {
    const res = await postJson('/registrations', { eventId: createdEventId }, studentToken);
    if (res.ok && res.data.registration?.registrationId) {
      testRegistrationId = res.data.registration._id;
      logTest(
        11,
        'Successful Event Registration',
        'PASSED',
        `Generated ID: ${res.data.registration.registrationId}`
      );
    } else {
      logTest(11, 'Successful Event Registration', 'FAILED', res.data.message || 'Registration failed');
    }
  } catch (err) {
    logTest(11, 'Successful Event Registration', 'FAILED', err.message);
  }

  // 12. Duplicate Event Registration Prevention
  try {
    const res = await postJson('/registrations', { eventId: createdEventId }, studentToken);
    if (res.status === 400) {
      logTest(12, 'Duplicate Event Registration Prevention', 'PASSED', 'Rejected with 400 Bad Request');
    } else {
      logTest(12, 'Duplicate Event Registration Prevention', 'FAILED', `Allowed duplicate with status ${res.status}`);
    }
  } catch (err) {
    logTest(12, 'Duplicate Event Registration Prevention', 'FAILED', err.message);
  }

  // 13. Registration Cancellation
  try {
    const res = await deleteJson(`/registrations/${testRegistrationId}`, studentToken);
    if (res.ok && res.data.registration?.status === 'Cancelled') {
      logTest(13, 'Registration Cancellation', 'PASSED', 'Status changed to Cancelled');
    } else {
      logTest(13, 'Registration Cancellation', 'FAILED', res.data.message || 'Status not marked cancelled');
    }
  } catch (err) {
    logTest(13, 'Registration Cancellation', 'FAILED', err.message);
  }

  // 14. Unauthorized Admin Access Prevention
  try {
    const res = await getJson('/admin/stats', studentToken);
    if (res.status === 403) {
      logTest(14, 'Unauthorized Admin Access Prevention', 'PASSED', 'Rejected with 403 Forbidden');
    } else {
      logTest(14, 'Unauthorized Admin Access Prevention', 'FAILED', `Expected 403 but got ${res.status}`);
    }
  } catch (err) {
    logTest(14, 'Unauthorized Admin Access Prevention', 'FAILED', err.message);
  }

  // 15. Admin Stats Endpoint
  try {
    const res = await getJson('/admin/stats', adminToken);
    if (res.ok && res.data.stats?.totalEvents > 0) {
      logTest(15, 'Admin Stats Retrieval', 'PASSED', `Total Events: ${res.data.stats.totalEvents}`);
    } else {
      logTest(15, 'Admin Stats Retrieval', 'FAILED', 'Stats payload incomplete');
    }
  } catch (err) {
    logTest(15, 'Admin Stats Retrieval', 'FAILED', err.message);
  }

  // 16. Profile Update
  try {
    const res = await putJson(
      '/users/profile',
      { name: 'Alex Johnson (Updated)', phone: '+1 555-9999', college: 'Dept of CS & AI' },
      studentToken
    );
    if (res.ok && res.data.user?.name.includes('(Updated)')) {
      logTest(16, 'User Profile Update', 'PASSED', 'Profile updated in database');
    } else {
      logTest(16, 'User Profile Update', 'FAILED', res.data.message || 'Profile name not updated');
    }
  } catch (err) {
    logTest(16, 'User Profile Update', 'FAILED', err.message);
  }

  // 17. Event Deletion (Admin)
  try {
    const res = await deleteJson(`/events/${createdEventId}`, adminToken);
    if (res.ok) {
      logTest(17, 'Admin Event Deletion', 'PASSED', 'Event and registrations removed');
    } else {
      logTest(17, 'Admin Event Deletion', 'FAILED', res.data.message || 'Delete response unsuccessful');
    }
  } catch (err) {
    logTest(17, 'Admin Event Deletion', 'FAILED', err.message);
  }

  // 18. Token Verification / Me
  try {
    const res = await getJson('/auth/me', studentToken);
    if (res.ok && res.data.user?.email) {
      logTest(18, 'Authentication Token Session Verification', 'PASSED', `Verified ${res.data.user.email}`);
    } else {
      logTest(18, 'Authentication Token Session Verification', 'FAILED', 'Verification failed');
    }
  } catch (err) {
    logTest(18, 'Authentication Token Session Verification', 'FAILED', err.message);
  }

  console.log('\n====================================================');
  const passedCount = results.filter((r) => r.status === 'PASSED').length;
  console.log(` SUMMARY: ${passedCount}/${results.length} TESTS PASSED SUCCESSFULLY!`);
  console.log('====================================================\n');
}

runTestSuite();
