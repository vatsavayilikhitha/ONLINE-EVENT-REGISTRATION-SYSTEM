import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs('pdf_assets', exist_ok=True)

def create_canvas(width=9.5, height=5.5, dpi=300):
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')
    return fig, ax

def add_box(ax, x, y, w, h, text, title="", color='#E8EEF5', border='#2C3E50', text_color='#1A252F', fontsize=8.5, rounded=True):
    boxstyle = "round,pad=0.4" if rounded else "square,pad=0.2"
    rect = patches.FancyBboxPatch((x, y), w, h, boxstyle=boxstyle, ec=border, fc=color, lw=1.2, mutation_scale=1.5)
    ax.add_patch(rect)
    cx, cy = x + w / 2, y + h / 2
    if title:
        ax.text(cx, y + h - 2.8, title, ha='center', va='top', fontsize=fontsize+0.8, fontweight='bold', color=border)
        ax.text(cx, cy - 1.2, text, ha='center', va='center', fontsize=fontsize-0.5, color=text_color)
    else:
        ax.text(cx, cy, text, ha='center', va='center', fontsize=fontsize, fontweight='bold' if len(text)<25 else 'normal', color=text_color)

def add_circle(ax, x, y, r, text, color='#EBF5FB', border='#2980B9', fontsize=8.5):
    circle = patches.Circle((x, y), r, ec=border, fc=color, lw=1.3)
    ax.add_patch(circle)
    if text:
        ax.text(x, y, text, ha='center', va='center', fontsize=fontsize, fontweight='bold', color='#1A252F')

def add_datastore(ax, x, y, w, h, ds_id, name):
    ax.plot([x, x, x + w], [y, y + h, y + h], color='#2C3E50', lw=1.3)
    ax.plot([x, x + w], [y, y], color='#2C3E50', lw=1.3)
    ax.plot([x + 8, x + 8], [y, y + h], color='#7F8C8D', lw=1.0)
    ax.text(x + 4, y + h/2, ds_id, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#2C3E50')
    ax.text(x + 9 + (w-9)/2, y + h/2, name, ha='center', va='center', fontsize=7.5, color='#1A252F')

def add_arrow_line(ax, x1, y1, x2, y2, label="", color='#2C3E50', label_pos='above', fontsize=7.2, ls='-'):
    style = patches.ArrowStyle.Simple(tail_width=0.4, head_width=3.2, head_length=4.0)
    arrow = patches.FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style, color=color, lw=1.0, linestyle=ls)
    ax.add_patch(arrow)
    if label:
        mx, my = (x1 + x2)/2, (y1 + y2)/2
        y_offset = 1.6 if label_pos == 'above' else -1.8
        ax.text(mx, my + y_offset, label, ha='center', va='center', fontsize=fontsize, color='#2C3E50', fontweight='500')

print("1. Generating Clean Level 0 DFD...")
fig, ax = create_canvas(9.5, 5.2)
fig.suptitle('LEVEL 0 DFD (Context Diagram) - Online Event Registration System', fontsize=11, fontweight='bold', y=0.96)
add_box(ax, 3, 34, 16, 32, "Student /\nAttendee", color='#EAEDED', border='#34495E', fontsize=9)
add_circle(ax, 50, 50, 13, "0\nOnline Event\nRegistration\nSystem", color='#E8F8F5', border='#16A085', fontsize=9)
add_box(ax, 81, 34, 16, 32, "Event\nAdministrator", color='#EAEDED', border='#34495E', fontsize=9)

# Student interactions
add_arrow_line(ax, 19, 61, 37, 61, "Login & Search Query", label_pos='above')
add_arrow_line(ax, 19, 52, 37, 52, "Registration / Cancel", label_pos='above')
add_arrow_line(ax, 37, 44, 19, 44, "Event Catalog & Status", label_pos='below')
add_arrow_line(ax, 37, 35, 19, 35, "Digital Ticket Pass (QR)", label_pos='below')

# Admin interactions
add_arrow_line(ax, 81, 61, 63, 61, "Admin Login & Events", label_pos='above')
add_arrow_line(ax, 81, 52, 63, 52, "Update / Delete Event", label_pos='above')
add_arrow_line(ax, 63, 44, 81, 44, "System Analytics", label_pos='below')
add_arrow_line(ax, 63, 35, 81, 35, "Participant Roster (CSV)", label_pos='below')
plt.savefig('pdf_assets/dfd_level_0.png', bbox_inches='tight')
plt.close()

print("2. Generating Clean Level 1 DFD...")
fig, ax = create_canvas(9.2, 11.2)
fig.suptitle('LEVEL 1 DFD - Online Event Registration System', fontsize=11, fontweight='bold', y=0.98)
add_box(ax, 4, 88, 17, 8, "Student\nUser", color='#EAEDED', border='#34495E', fontsize=8.5)
add_box(ax, 79, 88, 17, 8, "Event\nAdministrator", color='#EAEDED', border='#34495E', fontsize=8.5)

# Processes
add_circle(ax, 50, 92, 5.5, "1.0\nUser Auth", color='#EBF5FB', border='#2980B9', fontsize=8)
add_circle(ax, 50, 77, 5.5, "2.0\nEvent\nSearch", color='#EBF5FB', border='#2980B9', fontsize=8)
add_circle(ax, 50, 62, 5.5, "3.0\nEvent\nRegister", color='#E8F8F5', border='#16A085', fontsize=8)
add_circle(ax, 50, 47, 5.5, "4.0\nTicket\nGenerate", color='#FEF9E7', border='#F39C12', fontsize=8)
add_circle(ax, 50, 32, 5.5, "5.0\nCancel\nBooking", color='#FDEDEC', border='#E74C3C', fontsize=8)
add_circle(ax, 50, 17, 5.5, "6.0\nAdmin\nReports", color='#F4ECF7', border='#8E44AD', fontsize=8)

# Data Stores
add_datastore(ax, 74, 75, 23, 6, "D1", "User Database")
add_datastore(ax, 74, 60, 23, 6, "D2", "Event Database")
add_datastore(ax, 74, 45, 23, 6, "D3", "Registration DB")

# Clean Arrows
add_arrow_line(ax, 21, 93, 44.5, 93, "Credentials", label_pos='above')
add_arrow_line(ax, 79, 93, 55.5, 93, "Admin Auth", label_pos='above')
add_arrow_line(ax, 44.5, 90.5, 21, 90.5, "JWT Token", label_pos='below')
add_arrow_line(ax, 55.5, 91, 74, 79, "Verify", label_pos='above')

add_arrow_line(ax, 12, 88, 12, 78)
add_arrow_line(ax, 12, 78, 44.5, 78, "Search Query", label_pos='above')
add_arrow_line(ax, 44.5, 75.5, 12, 75.5, "Events Catalog", label_pos='below')
add_arrow_line(ax, 55.5, 77, 74, 63, "Query Events", label_pos='above')

add_arrow_line(ax, 12, 73, 12, 63)
add_arrow_line(ax, 12, 63, 44.5, 63, "Registration Req", label_pos='above')
add_arrow_line(ax, 55.5, 62, 74, 62, "Verify / Update", label_pos='above')
add_arrow_line(ax, 50, 56.5, 50, 52.5, "Confirmed", label_pos='above')

add_arrow_line(ax, 55.5, 47, 74, 47, "Save Booking", label_pos='above')
add_arrow_line(ax, 44.5, 47, 12, 47, "Digital Ticket Pass", label_pos='above')

add_arrow_line(ax, 12, 44, 12, 33)
add_arrow_line(ax, 12, 33, 44.5, 33, "Cancel Request", label_pos='above')
add_arrow_line(ax, 55.5, 33, 74, 45, "Mark Cancelled", label_pos='below')
add_arrow_line(ax, 44.5, 31, 12, 31, "Cancellation Confirmed", label_pos='below')

add_arrow_line(ax, 87, 88, 87, 20)
add_arrow_line(ax, 87, 20, 55.5, 18, "Report Query", label_pos='above')
add_arrow_line(ax, 55.5, 16, 87, 16, "Metrics & Rosters", label_pos='below')
plt.savefig('pdf_assets/dfd_level_1.png', bbox_inches='tight')
plt.close()

print("3. Generating Clean Level 2 DFD...")
fig, ax = create_canvas(9.5, 5.5)
fig.suptitle('LEVEL 2 DFD - Decomposition of 3.0 Registration & Seat Booking', fontsize=11, fontweight='bold', y=0.96)
add_box(ax, 3, 40, 15, 20, "Student\nUser", color='#EAEDED', border='#34495E', fontsize=8.5)
add_circle(ax, 28, 50, 6, "3.1\nValidate\nSession", color='#E8F8F5', border='#16A085', fontsize=7.5)
add_circle(ax, 48, 50, 6, "3.2\nCheck\nSeats", color='#E8F8F5', border='#16A085', fontsize=7.5)
add_circle(ax, 68, 50, 6, "3.3\nPrevent\nDuplicate", color='#E8F8F5', border='#16A085', fontsize=7.5)
add_circle(ax, 88, 50, 6, "3.4\nConfirm\nBooking", color='#E8F8F5', border='#16A085', fontsize=7.5)

add_datastore(ax, 18, 14, 20, 6, "D1", "User Database")
add_datastore(ax, 44, 14, 20, 6, "D2", "Event Database")
add_datastore(ax, 70, 14, 24, 6, "D3", "Registration Database")

# Transitions between circles
add_arrow_line(ax, 18, 50, 22, 50, "Click Reg", label_pos='above', fontsize=7)
add_arrow_line(ax, 34, 50, 42, 50, "Valid Auth", label_pos='above', fontsize=7)
add_arrow_line(ax, 54, 50, 62, 50, "Seat Avail", label_pos='above', fontsize=7)
add_arrow_line(ax, 74, 50, 82, 50, "Not Enrolled", label_pos='above', fontsize=7)

# Down to datastores
add_arrow_line(ax, 28, 44, 28, 20, "Verify Token", label_pos='above', fontsize=7)
add_arrow_line(ax, 48, 44, 48, 20, "Check Cap", label_pos='above', fontsize=7)
add_arrow_line(ax, 68, 44, 76, 20, "Check Reg", label_pos='above', fontsize=7)
add_arrow_line(ax, 88, 44, 84, 20, "Save Pass", label_pos='above', fontsize=7)

# Arc back to student
style = patches.ArrowStyle.Simple(tail_width=0.4, head_width=3.2, head_length=4.0)
arrow_back = patches.FancyArrowPatch((88, 56), (11, 60), connectionstyle="arc3,rad=0.25", arrowstyle=style, color='#16A085', lw=1.1)
ax.add_patch(arrow_back)
ax.text(50, 77, "Issue Digital Admission Pass & QR Code", ha='center', va='center', fontsize=8, color='#16A085', fontweight='bold')
plt.savefig('pdf_assets/dfd_level_2.png', bbox_inches='tight')
plt.close()

print("4. Generating Clean Use Case Diagram...")
fig, ax = create_canvas(9.5, 6.2)
fig.suptitle('Figure 9.1: Online Event Registration System Use Case Diagram', fontsize=11, fontweight='bold', y=0.97)

# System Boundary
sys_box = patches.Rectangle((22, 5), 56, 88, fill=False, ec='#34495E', lw=1.2, ls='--')
ax.add_patch(sys_box)
ax.text(50, 89.5, "ONLINE EVENT REGISTRATION SYSTEM", ha='center', va='center', fontsize=8.5, fontweight='bold', color='#2C3E50')

# Actors
add_box(ax, 3, 40, 16, 18, "Student /\nAttendee", color='#EAEDED', border='#34495E', fontsize=8.5)
add_box(ax, 81, 40, 16, 18, "Event\nAdministrator", color='#EAEDED', border='#34495E', fontsize=8.5)

use_cases = [
    # (x, y, name, actor)
    (36, 79, "User Login / Logout", "both"),
    (36, 68, "Browse & Filter Events", "student"),
    (36, 57, "View Event Details & Seats", "student"),
    (36, 46, "Register for Event", "student"),
    (36, 35, "View Digital Ticket Pass", "student"),
    (36, 24, "Cancel Event Registration", "student"),
    (36, 13, "Manage Profile & Password", "student"),
    (64, 68, "Create New Event", "admin"),
    (64, 57, "Edit / Delete Event", "admin"),
    (64, 46, "View Registered Attendees", "admin"),
    (64, 35, "Export Roster (.CSV)", "admin"),
    (64, 24, "View Event Analytics", "admin"),
]

for cx, cy, name, role in use_cases:
    ellipse = patches.Ellipse((cx, cy), 20, 7.5, ec='#2980B9', fc='#EBF5FB', lw=1.1)
    ax.add_patch(ellipse)
    ax.text(cx, cy, name, ha='center', va='center', fontsize=6.8, color='#1A252F')
    
    if role in ["student", "both"]:
        ax.plot([19, cx - 10], [49, cy], color='#7F8C8D', lw=0.9)
    if role in ["admin", "both"]:
        ax.plot([81, cx + 10], [49, cy], color='#7F8C8D', lw=0.9)

plt.savefig('pdf_assets/use_case_diagram.png', bbox_inches='tight')
plt.close()

print("5. Generating Clean Class Diagram...")
fig, ax = create_canvas(9.5, 6.2)
fig.suptitle('Figure 10.1: Class Diagram - Online Event Registration System', fontsize=11, fontweight='bold', y=0.96)

u_text = "- _id: ObjectId\n- name: String\n- email: String\n- password: String\n- phone: String\n- college: String\n- role: String\n-----------------------\n+ matchPassword(pwd): bool\n+ generateToken(): String"
add_box(ax, 5, 42, 27, 48, u_text, title="User", color='#FEF9E7', border='#F39C12', fontsize=7.2, rounded=False)

e_text = "- _id: ObjectId\n- title: String\n- description: String\n- category: String\n- date: Date\n- startTime: String\n- venue: String\n- capacity: Number\n- registeredCount: Number\n- deadline: Date\n-----------------------\n+ isDeadlinePassed(): bool\n+ getSeatsRemaining(): Number\n+ updateRegisteredCount(): void"
add_box(ax, 68, 38, 27, 52, e_text, title="Event", color='#E8F8F5', border='#16A085', fontsize=7.2, rounded=False)

r_text = "- _id: ObjectId\n- registrationId: String\n- user: ObjectId (Ref User)\n- event: ObjectId (Ref Event)\n- status: String\n- registeredAt: Date\n-----------------------\n+ confirmRegistration(): void\n+ cancelRegistration(): void\n+ generateTicketPass(): Ticket"
add_box(ax, 34, 6, 32, 36, r_text, title="Registration", color='#EBF5FB', border='#2980B9', fontsize=7.2, rounded=False)

# Connector User -> Registration
ax.plot([32, 45], [66, 66], color='#2C3E50', lw=1.2)
ax.plot([45, 45], [66, 42], color='#2C3E50', lw=1.2)
ax.text(33.5, 68, "1", fontsize=8, fontweight='bold')
ax.text(42, 44, "0..*", fontsize=8, fontweight='bold')
ax.text(37, 56, "Registers for", fontsize=7.2, style='italic', color='#566573')

# Connector Event -> Registration
ax.plot([68, 55], [64, 64], color='#2C3E50', lw=1.2)
ax.plot([55, 55], [64, 42], color='#2C3E50', lw=1.2)
ax.text(66, 66, "1", fontsize=8, fontweight='bold')
ax.text(56.5, 44, "0..*", fontsize=8, fontweight='bold')
ax.text(57, 56, "Booked in", fontsize=7.2, style='italic', color='#566573')

plt.savefig('pdf_assets/class_diagram.png', bbox_inches='tight')
plt.close()

print("6. Generating Clean Sequence Diagrams...")
def build_sequence(title, filename, actors, steps):
    fig, ax = create_canvas(9.2, 5.8)
    fig.suptitle(title, fontsize=10.5, fontweight='bold', y=0.96)
    n = len(actors)
    col_w = 90 / (n - 1) if n > 1 else 90
    xs = [5 + i * col_w for i in range(n)]
    
    # Draw lifelines
    for x, act in zip(xs, actors):
        add_box(ax, x - 7.5, 85, 15, 7, act, color='#EAEDED', border='#34495E', fontsize=7.5)
        ax.plot([x, x], [85, 8], color='#BDC3C7', lw=1.0, ls='--')
    
    y = 78
    step_y = 68 / len(steps)
    for src_idx, dst_idx, msg, is_return in steps:
        x1, x2 = xs[src_idx], xs[dst_idx]
        style = patches.ArrowStyle.Simple(tail_width=0.35, head_width=3.0, head_length=4.0)
        col = '#2980B9' if not is_return else '#27AE60'
        ls = '--' if is_return else '-'
        arrow = patches.FancyArrowPatch((x1, y), (x2, y), arrowstyle=style, color=col, lw=1.1, linestyle=ls)
        ax.add_patch(arrow)
        mx = (x1 + x2) / 2
        ax.text(mx, y + 1.6, msg, ha='center', va='bottom', fontsize=6.8, color='#1A252F', fontweight='500')
        y -= step_y
    
    plt.savefig(f'pdf_assets/{filename}', bbox_inches='tight')
    plt.close()

build_sequence(
    "Figure 10.2: User Login Sequence Diagram",
    "sequence_login.png",
    ["User", "Frontend UI", "Auth Controller", "User Model", "MongoDB"],
    [
        (0, 1, "1. Enter email & password", False),
        (1, 2, "2. POST /api/auth/login", False),
        (2, 3, "3. findOne({ email })", False),
        (3, 4, "4. Query User Document", False),
        (4, 3, "5. User Record & Password Hash", True),
        (3, 2, "6. bcrypt.compare(pwd, hash)", False),
        (2, 1, "7. 200 OK + JWT Token + Profile", True),
        (1, 0, "8. Render Dashboard / Events", True)
    ]
)

build_sequence(
    "Figure 10.3: Event Registration Sequence Diagram",
    "sequence_registration.png",
    ["Student", "Event Details UI", "Reg Controller", "Event Model", "Registration DB"],
    [
        (0, 1, "1. Click 'Register Now (Free)'", False),
        (1, 2, "2. POST /api/registrations/:eventId", False),
        (2, 3, "3. Verify Capacity & Deadline", False),
        (3, 2, "4. Seats Available (count < cap)", True),
        (2, 4, "5. Create Registration & Generate ID", False),
        (4, 2, "6. Saved Confirmation Object", True),
        (2, 3, "7. Increment registeredCount (+1)", False),
        (2, 1, "8. Return Registration Ticket", True),
        (1, 0, "9. Display Digital Pass with QR", True)
    ]
)

build_sequence(
    "Figure 10.4: Event Creation / Management Sequence Diagram",
    "sequence_admin_event.png",
    ["Admin", "Admin Events UI", "Event Controller", "Auth Middleware", "MongoDB Event"],
    [
        (0, 1, "1. Submit Event Form (title, cap, date)", False),
        (1, 2, "2. POST /api/events (Bearer Token)", False),
        (2, 3, "3. Verify JWT & Admin Role", False),
        (3, 2, "4. Authorized Admin", True),
        (2, 4, "5. Event.create(eventData)", False),
        (4, 2, "6. New Event Document Persisted", True),
        (2, 1, "7. 201 Created Response", True),
        (1, 0, "8. Flash Success & Refresh Catalog", True)
    ]
)

build_sequence(
    "Figure 10.5: Ticket Cancellation Sequence Diagram",
    "sequence_cancellation.png",
    ["Student", "My Registrations UI", "Reg Controller", "Event Model", "Registration DB"],
    [
        (0, 1, "1. Click 'Cancel Registration'", False),
        (1, 2, "2. DELETE /api/registrations/:id", False),
        (2, 4, "3. Update status = 'Cancelled'", False),
        (4, 2, "4. Cancellation Confirmed", True),
        (2, 3, "5. Decrement registeredCount (-1)", False),
        (3, 2, "6. Seat Released to Catalog", True),
        (2, 1, "7. 200 OK Response", True),
        (1, 0, "8. Update Ticket Status to Cancelled", True)
    ]
)

print("7. Generating Clean Activity Diagram...")
fig, ax = create_canvas(9.2, 6.2)
fig.suptitle('Figure 10.6: Student Event Registration Activity Diagram', fontsize=11, fontweight='bold', y=0.96)
add_circle(ax, 50, 93, 2.2, "", color='#17202A', border='#17202A') # Start
add_box(ax, 38, 80, 24, 7, "Browse Events Catalog", color='#E8F8F5', border='#16A085', fontsize=8)
add_box(ax, 38, 68, 24, 7, "Select Event & View Details", color='#E8F8F5', border='#16A085', fontsize=8)

# Decision Diamond
diamond = patches.Polygon([[50, 61], [64, 55], [50, 49], [36, 55]], ec='#F39C12', fc='#FEF9E7', lw=1.2)
ax.add_patch(diamond)
ax.text(50, 55, "Seats Available\n& Within Cutoff?", ha='center', va='center', fontsize=7.0, color='#1A252F', fontweight='bold')

add_box(ax, 8, 42, 22, 8, "Display 'Seats Full'\nor 'Closed' Tag", color='#FDEDEC', border='#E74C3C', fontsize=7.2)
add_box(ax, 68, 42, 24, 8, "Verify Authentication\n(Login if needed)", color='#EBF5FB', border='#2980B9', fontsize=7.2)
add_box(ax, 38, 28, 24, 7, "Confirm Free Registration", color='#E8F8F5', border='#16A085', fontsize=8)
add_box(ax, 36, 16, 28, 7, "Generate Digital Pass with ID", color='#E8F8F5', border='#16A085', fontsize=8)

# End node
add_circle(ax, 50, 4, 2.5, "", color='#17202A', border='#17202A')
ax.add_patch(patches.Circle((50, 4), 1.5, ec='white', fc='white'))

# Connecting arrows
add_arrow_line(ax, 50, 90.8, 50, 87)
add_arrow_line(ax, 50, 80, 50, 75)
add_arrow_line(ax, 50, 68, 50, 61)

# Diamond branches
add_arrow_line(ax, 36, 55, 19, 50, "[No]", label_pos='above', fontsize=7.2)
add_arrow_line(ax, 64, 55, 80, 50, "[Yes]", label_pos='above', fontsize=7.2)

add_arrow_line(ax, 80, 42, 50, 35, "Authenticated", label_pos='above', fontsize=7.2)
add_arrow_line(ax, 50, 28, 50, 23)
add_arrow_line(ax, 50, 16, 50, 6.8)

# Left escape route around boxes to end
style = patches.ArrowStyle.Simple(tail_width=0.4, head_width=3.2, head_length=4.0)
ax.plot([19, 19], [42, 4], color='#2C3E50', lw=1.0)
ax.plot([19, 47.2], [4, 4], color='#2C3E50', lw=1.0)
arrow_end_left = patches.FancyArrowPatch((45, 4), (47.2, 4), arrowstyle=style, color='#2C3E50', lw=1.0)
ax.add_patch(arrow_end_left)

plt.savefig('pdf_assets/activity_registration.png', bbox_inches='tight')
plt.close()

print("8. Generating Clean State Diagram...")
fig, ax = create_canvas(9.5, 4.8)
fig.suptitle('Figure 10.8: Event & Seat Booking Lifecycle State Diagram', fontsize=11, fontweight='bold', y=0.96)
add_circle(ax, 6, 50, 2.2, "", color='#17202A', border='#17202A')
add_box(ax, 14, 41, 16, 18, "Draft /\nCreated", color='#EAEDED', border='#34495E', fontsize=8.5)
add_box(ax, 40, 41, 18, 18, "Open for\nRegistration", color='#E8F8F5', border='#16A085', fontsize=8.5)
add_box(ax, 69, 64, 18, 16, "Seats Full\n(Waitlist Closed)", color='#FEF9E7', border='#F39C12', fontsize=7.8)
add_box(ax, 69, 20, 18, 16, "Registration\nClosed", color='#FDEDEC', border='#E74C3C', fontsize=7.8)

add_circle(ax, 94, 50, 2.5, "", color='#17202A', border='#17202A')
ax.add_patch(patches.Circle((94, 50), 1.5, ec='white', fc='white'))

add_arrow_line(ax, 8.2, 50, 14, 50)
add_arrow_line(ax, 30, 50, 40, 50, "Publish Event", label_pos='above', fontsize=7.2)

# Open -> Seats Full
add_arrow_line(ax, 54, 59, 69, 72, "count == cap", label_pos='above', fontsize=7.2)
add_arrow_line(ax, 69, 67, 58, 56, "Seat Cancelled", label_pos='below', fontsize=7.2)

# Open -> Registration Closed
add_arrow_line(ax, 54, 41, 69, 28, "date > deadline", label_pos='below', fontsize=7.2)

# To End
add_arrow_line(ax, 87, 72, 94, 52.8)
add_arrow_line(ax, 87, 28, 94, 47.2)

plt.savefig('pdf_assets/state_booking.png', bbox_inches='tight')
plt.close()

print("9. Generating Clean Component Diagram...")
fig, ax = create_canvas(9.5, 6.0)
fig.suptitle('Figure 10.9: Component Diagram - Online Event Registration System', fontsize=11, fontweight='bold', y=0.96)
add_box(ax, 4, 62, 27, 24, "Web Client UI\n(React 19 / Vite)\nTailwind CSS / Router\nTheme Context", title="Presentation Layer", color='#E8F8F5', border='#16A085', fontsize=8)
add_box(ax, 36.5, 62, 27, 24, "REST API Controller\nAuth, Events, Registrations\nJWT Middleware\nInput Validation", title="Application Services", color='#EBF5FB', border='#2980B9', fontsize=8)
add_box(ax, 69, 62, 27, 24, "Data Access Layer\nMongoose Schemas\nBcrypt Validation\nIndex Constraints", title="Persistence Layer", color='#FEF9E7', border='#F39C12', fontsize=8)

add_box(ax, 35, 12, 30, 22, "MongoDB v8 Server\neventhub_db Database\nCollections: users, events, registrations", title="Database Engine", color='#FDEDEC', border='#C0392B', fontsize=8)

add_arrow_line(ax, 31, 74, 36.5, 74, "HTTP/REST", label_pos='above', fontsize=7.5)
add_arrow_line(ax, 63.5, 74, 69, 74, "Model Calls", label_pos='above', fontsize=7.5)
add_arrow_line(ax, 82, 62, 65, 27, "BSON Wire Protocol", label_pos='above', fontsize=7.2)
add_arrow_line(ax, 50, 34, 50, 62, "Query Results", label_pos='above', fontsize=7.2)

plt.savefig('pdf_assets/component_diagram.png', bbox_inches='tight')
plt.close()

print("10. Generating Clean Deployment Diagram...")
fig, ax = create_canvas(9.5, 4.8)
fig.suptitle('Figure 10.10: Deployment Diagram - Online Event Registration System', fontsize=11, fontweight='bold', y=0.96)
add_box(ax, 4, 25, 26, 46, "Web Browser\n(Chrome / Edge / Firefox)\nHTML5, React 19, CSS3\nDesktop / Tablet / Mobile", title="«device»\nClient Device", color='#EAECEE', border='#34495E', fontsize=8)
add_box(ax, 37, 25, 26, 46, "Node.js v24 Runtime\nExpress.js Application\nREST API (Port 5000)\nJWT Security Service", title="«device»\nApplication Server", color='#EBF5FB', border='#2980B9', fontsize=8)
add_box(ax, 70, 25, 26, 46, "MongoDB v8 Engine\neventhub_db Store\nDefault Port 27017\nDocument Collections", title="«device»\nDatabase Server", color='#FEF9E7', border='#F39C12', fontsize=8)

add_arrow_line(ax, 30, 48, 37, 48, "TCP / HTTP :5000", label_pos='above', fontsize=7.5)
add_arrow_line(ax, 63, 48, 70, 48, "TCP :27017 (Mongo)", label_pos='above', fontsize=7.5)

plt.savefig('pdf_assets/deployment_diagram.png', bbox_inches='tight')
plt.close()
print("All clean diagrams generated successfully!")
