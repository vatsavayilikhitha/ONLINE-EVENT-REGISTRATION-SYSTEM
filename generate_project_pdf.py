import os
import sys
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
from fpdf import FPDF

class AcademicReportPDF(FPDF):
    def __init__(self):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.set_auto_page_break(auto=False)
        self.add_font('Arial', '', 'C:/Windows/Fonts/arial.ttf')
        self.add_font('Arial', 'B', 'C:/Windows/Fonts/arialbd.ttf')
        self.add_font('Arial', 'I', 'C:/Windows/Fonts/ariali.ttf')
        self.current_section = ""
        self.report_page_num = 0

    def draw_page_border(self):
        # Outer professional double or single border matching reference PDF
        self.set_draw_color(30, 30, 30)
        self.set_line_width(0.6)
        self.rect(10, 10, 190, 277)

    def header(self):
        self.draw_page_border()

    def footer(self):
        # Footer page number (only for content pages after Cover and TOC)
        if self.page_no() >= 4:
            self.set_y(272)
            self.set_font('Arial', '', 9.5)
            self.set_text_color(80, 80, 80)
            doc_page_str = str(self.page_no() - 3)
            self.cell(0, 10, doc_page_str, 0, 0, 'C')

    def add_section_title(self, title):
        self.set_font('Arial', 'B', 13)
        self.set_text_color(20, 20, 20)
        self.cell(0, 8, title, 0, 1, 'L')
        self.ln(2)

    def add_sub_title(self, subtitle):
        self.set_font('Arial', 'B', 10.5)
        self.set_text_color(35, 35, 35)
        self.cell(0, 6, subtitle, 0, 1, 'L')
        self.ln(1)

    def add_paragraph(self, text, spacing=5.0):
        self.set_font('Arial', '', 9.5)
        self.set_text_color(40, 40, 40)
        self.multi_cell(174, spacing, text, 0, 'L')
        self.ln(2.5)

    def add_bullet_point(self, title, desc, bullet="\u2022"):
        self.set_font('Arial', 'B', 9.5)
        self.set_text_color(30, 30, 30)
        prefix = f"{bullet}  {title}: " if title else f"{bullet}  "
        self.write(5.0, prefix)
        self.set_font('Arial', '', 9.5)
        self.set_text_color(50, 50, 50)
        self.write(5.0, desc + "\n")
        self.ln(1.5)

def build_pdf():
    pdf = AcademicReportPDF()
    pdf.set_margins(18, 18, 18)

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    
    # Title
    pdf.set_font('Arial', 'B', 15)
    pdf.set_text_color(20, 20, 20)
    pdf.cell(0, 8, "PROJECT DOCUMENT ON", 0, 1, 'C')
    pdf.ln(1)
    pdf.set_font('Arial', 'B', 18)
    pdf.cell(0, 9, "ONLINE EVENT REGISTRATION SYSTEM", 0, 1, 'C')
    pdf.ln(1)
    pdf.set_font('Arial', 'B', 13)
    pdf.cell(0, 7, "(SOFTWARE ENGINEERING)", 0, 1, 'C')
    
    # ANITS Logo
    logo_path = 'pdf_assets/anits_logo_clean.png'
    if os.path.exists(logo_path):
        pdf.image(logo_path, x=75, y=55, w=60)
    
    # "By" Section
    pdf.set_y(107)
    pdf.set_font('Arial', 'B', 12.5)
    pdf.cell(0, 6, "By", 0, 1, 'C')
    pdf.ln(3)

    students = [
        ("G. Rakesh", "A24126510130"),
        ("R. Manaswini", "A24126510163"),
        ("T. Chandrasekhar", "A24126510173"),
        ("V. Likhitha", "A24126510175"),
        ("Y. M. Dhanush Sai", "A24126510177"),
        ("A. Karthik", "A24126510266"),
        ("P. Harshavardhan", "A24126510269")
    ]
    
    pdf.set_font('Arial', 'B', 11)
    for name, roll in students:
        pdf.set_x(48)
        pdf.cell(48, 6.4, roll, 0, 0, 'L')
        pdf.cell(8, 6.4, "-", 0, 0, 'C')
        pdf.cell(58, 6.4, name, 0, 1, 'L')

    # "SUBMITTED TO" Section
    pdf.set_y(184)
    pdf.set_font('Arial', 'B', 12.5)
    pdf.cell(0, 6.5, "SUBMITTED TO", 0, 1, 'C')
    pdf.ln(2.5)

    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 6.2, "Prof. K.Venkata Ratnam , M.Tech", 0, 1, 'C')
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(0, 5.8, "DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING", 0, 1, 'C')
    pdf.set_font('Arial', 'B', 10.5)
    pdf.cell(0, 5.5, "Anil Neerukonda Institute Of Technology &Sciences (A+)", 0, 1, 'C')
    pdf.set_font('Arial', '', 10)
    pdf.cell(0, 5.2, "(Affiliated to Andhra University)", 0, 1, 'C')
    pdf.ln(1)
    pdf.set_font('Arial', '', 9.5)
    pdf.cell(0, 5.0, "Sangivalasa - 531162, Bheemunipatnam Mandal, Visakhapatnam Dist.", 0, 1, 'C')

    # =========================================================================
    # PAGE 2: ABSTRACT
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("ABSTRACT")
    pdf.add_paragraph(
        "The Online Event Registration System is a modern, responsive web application developed to automate and "
        "streamline college event discovery, attendee seat reservations, registration management, and campus administration. "
        "Traditional event management methods in academic institutions rely on physical sign-up sheets, circulated paper circulars, "
        "fragmented spreadsheets, or unstructured Google Forms. These manual approaches frequently cause registration bottlenecks, "
        "seat overbooking, lack of real-time seat transparency, lost registration records, and intense administrative workload. "
        "The proposed system delivers a centralized, reliable digital platform that connects college students and event organizers seamlessly."
    )
    
    pdf.add_sub_title("1. Problem Being Addressed:")
    pdf.add_paragraph(
        "Manual event organization makes it difficult to broadcast upcoming technical symposiums, workshops, and fests to the entire student "
        "body in a timely manner. Administrators struggle to enforce seat capacity limits, prevent duplicate submissions, authenticate eligible "
        "students, communicate venue updates, generate verifiable admission tickets, and aggregate accurate participation rosters."
    )

    pdf.add_sub_title("2. Proposed System:")
    pdf.add_paragraph(
        "The proposed system establishes secure, role-based access for Students/Attendees and Event Administrators. Students can browse the event "
        "catalog, apply dynamic category filtering, verify remaining seat quotas in real-time, register with a single click, access their personalized "
        "dashboard, download verifiable digital admission tickets, and cancel bookings if their schedule changes. Administrators are equipped "
        "with an executive management console to create, update, or remove events, monitor live seat capacities, and export attendee rosters."
    )

    pdf.add_sub_title("3. Major Features:")
    pdf.add_paragraph(
        "The platform includes JWT-secured authentication, bcrypt password hashing, instantaneous event search and multi-category filtering, real-time "
        "seat capacity tracking, automated admission pass generation with unique verification codes, cancellation safeguards, executive admin "
        "analytics, responsive design across all devices, and robust form validation."
    )

    pdf.add_sub_title("4. Technologies Used:")
    pdf.add_paragraph(
        "The frontend is engineered with React 19, Vite, Tailwind CSS, React Router, and Lucide React icons. The backend is developed on Node.js "
        "and Express.js implementing a RESTful API architecture. Database management is powered by MongoDB and Mongoose ODM, utilizing JSON Web "
        "Tokens (JWT) and Bcrypt for enterprise-grade authentication."
    )

    # =========================================================================
    # PAGE 3: TABLE OF CONTENTS
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.set_font('Arial', 'B', 13)
    pdf.cell(0, 8, "TABLE OF CONTENTS", 0, 1, 'C')
    pdf.ln(4)

    # Table Header
    pdf.set_font('Arial', 'B', 10)
    pdf.set_fill_color(245, 245, 245)
    pdf.set_draw_color(40, 40, 40)
    pdf.cell(18, 8, "S.No", 1, 0, 'C', fill=True)
    pdf.cell(126, 8, "Title", 1, 0, 'C', fill=True)
    pdf.cell(30, 8, "Page No.", 1, 1, 'C', fill=True)

    toc_entries = [
        ("1", "Introduction", "1 - 2"),
        ("2", "Existing System", "3"),
        ("3", "Proposed System", "4"),
        ("4", "Requirements Specification", "5 - 7"),
        ("5", "Hardware and Software Requirements", "8 - 9"),
        ("6", "Data Flow Diagram", "10 - 12"),
        ("7", "System Architecture", "13"),
        ("8", "Module Description", "14 - 15"),
        ("9", "System Analysis", "16 - 18"),
        ("10", "UML Design", "19 - 25"),
        ("11", "Testing", "26 - 28"),
        ("12", "Results / Screenshots", "29 - 35"),
        ("13", "Limitations", "36"),
        ("14", "Conclusion", "37"),
        ("15", "References", "38"),
        ("", "Appendix", "39 - 42")
    ]

    pdf.set_font('Arial', '', 9.5)
    for sno, title, pg in toc_entries:
        pdf.cell(18, 7.2, sno, 1, 0, 'C')
        pdf.cell(126, 7.2, f"  {title}", 1, 0, 'L')
        pdf.cell(30, 7.2, pg, 1, 1, 'C')

    # =========================================================================
    # PAGE 4: 1. INTRODUCTION (Doc Page 1)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("1. Introduction")
    pdf.add_paragraph(
        "The Online Event Registration System is a full-stack, enterprise-grade web platform designed to simplify, automate, "
        "and coordinate the discovery, registration, and administrative oversight of collegiate events. Modern universities host an "
        "extensive array of extracurricular and co-curricular functions throughout the academic year, including technical symposiums, "
        "hackathons, hands-on engineering workshops, cultural festivals, guest seminars, and athletic competitions."
    )
    pdf.add_paragraph(
        "The system serves two primary stakeholder groups: Students/Attendees and Event Administrators. Students can seamlessly browse "
        "all scheduled events, review comprehensive agendas and faculty coordinator contacts, verify seat quotas in real-time, reserve free "
        "admission passes, and manage their registration tickets. Administrators can author new events, edit scheduling details, enforce strict "
        "seat quotas, inspect registered student rosters, and view real-time participation analytics."
    )
    pdf.add_paragraph(
        "The software strictly adheres to modern Software Engineering principles, including modular decoupled architecture, secure RESTful APIs, "
        "robust role-based access control (RBAC), end-to-end data validation, and asynchronous database persistence. The application combines a "
        "React frontend with a Node.js/Express backend and MongoDB database to replace cumbersome paper-based coordination with an effortless "
        "digital workflow."
    )

    pdf.add_sub_title("1.1 Background")
    pdf.add_paragraph(
        "Academic institutions thrive on student engagement beyond classroom boundaries. However, organizing hundreds of participants across "
        "diverse departments requires substantial administrative effort. In the absence of a centralized software platform, departments announce "
        "events via notice boards, scattered flyers, or temporary Google Forms. This leads to information silos, lack of real-time seat availability "
        "visibility, duplicate student entries, and tedious manual preparation of attendance sheets."
    )
    pdf.add_paragraph(
        "The Online Event Registration System resolves these challenges through a centralized, high-performance database. It provides an immediate "
        "overview of all campus happenings, guarantees strict seat capacity tracking, and eliminates the communication gap between student "
        "bodies and faculty organizers."
    )

    pdf.add_sub_title("1.2 Problem Statement")
    pdf.add_paragraph(
        "Manual event coordination makes it extraordinarily difficult to enforce venue capacity regulations, prevent overbooking, verify valid "
        "student identities, monitor cutoff deadlines, and generate verifiable admission credentials. Consequently, event coordinators spend "
        "excessive hours consolidating registration records, while students face uncertainty regarding their admission status."
    )

    pdf.add_sub_title("1.3 Motivation")
    pdf.add_paragraph(
        "This project was conceived to overcome the inefficiencies of manual event coordination and demonstrate the practical application of "
        "core Software Engineering concepts, including requirement specification, system modeling (DFD, UML), stateful authentication, database "
        "normalization, and structured validation testing in a real-world scenario."
    )

    # =========================================================================
    # PAGE 5: 1.4 OBJECTIVES (Doc Page 2)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_paragraph(
        "By applying modern full-stack development methodologies, the project aims to deliver a scalable, fault-tolerant platform suitable for "
        "campus-wide institutional adoption."
    )

    pdf.add_sub_title("1.4 Objectives")
    objectives = [
        "To automate and digitize the end-to-end campus event registration process.",
        "To provide an intuitive, modern, and accessible user interface for students and event coordinators.",
        "To maintain centralized, consistent, and validated event records, venues, and student profiles.",
        "To deliver instantaneous keyword search, category filtering, and real-time seat availability tracking.",
        "To enforce strict seat capacity controls and automated registration deadline cutoffs.",
        "To issue unique digital admission tickets with verified pass identifiers for attendee tracking.",
        "To provide students with a personal self-service dashboard to manage passes and cancel bookings.",
        "To supply administrators with comprehensive CRUD capabilities, live statistics, and attendee roster exports.",
        "To implement secure authentication with JSON Web Tokens (JWT) and Bcrypt password hashing."
    ]
    for i, obj in enumerate(objectives, 1):
        pdf.add_bullet_point(f"{i}", obj, bullet=f"{i}.")

    # =========================================================================
    # PAGE 6: 2. EXISTING SYSTEM (Doc Page 3)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("2. Existing System")
    pdf.add_paragraph(
        "In the prevailing conventional setup across most colleges, event management is handled manually through paper notice boards, "
        "physical sign-up sheets, circulated memos, or disjointed spreadsheets managed independently by faculty coordinators. Students "
        "must physically visit departmental notice boards or rely on peer messaging groups to learn about upcoming workshops and symposiums."
    )
    pdf.add_paragraph(
        "When registering, students submit their personal details on manual logbooks or ad-hoc Google Forms that lack capacity limits. As a "
        "consequence, popular events regularly become heavily oversubscribed, exceeding lecture hall and laboratory safety capacities. Verifying "
        "genuine student credentials requires tedious cross-referencing against university roll lists, creating substantial administrative overhead."
    )
    pdf.add_paragraph(
        "Furthermore, generating participant lists, issuing event hall tickets, and tracking attendance require hours of manual transcription. "
        "When an attendee wishes to cancel, updating the records manually is rarely feasible, causing vacant seats that could have been reallocated "
        "to interested peers."
    )

    pdf.add_sub_title("Limitations of the Existing System")
    limitations = [
        ("Manual Maintenance of Records", "Data stored in paper sheets or fragmented spreadsheets is vulnerable to loss, corruption, and inconsistency."),
        ("No Real-Time Seat Visibility", "Students cannot view how many seats remain before attempting to register."),
        ("Severe Risk of Overbooking", "Manual systems lack automated locks when venue capacity is reached, leading to logistical chaos on event day."),
        ("Absence of Instant Confirmation", "Students receive no immediate proof of registration or formal digital ticket pass."),
        ("Inability to Self-Cancel", "No self-service mechanism exists for students to cancel bookings and free up seats for others."),
        ("Prone to Data Entry Errors", "Illegible handwriting and duplicate form submissions compromise attendee record accuracy."),
        ("High Administrative Workload", "Faculty coordinators expend critical academic time on routine clerical and verification tasks."),
        ("Lack of Comprehensive Analytics", "Administrators cannot quickly assess institutional participation metrics or department engagement.")
    ]
    for title, desc in limitations:
        pdf.add_bullet_point(title, desc)

    # =========================================================================
    # PAGE 7: 3. PROPOSED SYSTEM (Doc Page 4)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("3. Proposed System")
    pdf.add_paragraph(
        "The proposed Online Event Registration System is a centralized, high-performance web platform engineered specifically to overcome "
        "every limitation of manual event coordination. It provides an elegant, responsive environment that connects student participants "
        "and institutional administrators within a unified ecosystem."
    )
    pdf.add_paragraph(
        "The system implements strict Role-Based Access Control (RBAC), bifurcating system functionality into Student/User and Event Administrator "
        "privileges. Students can explore an active catalog of college events, apply multi-criteria filtering (Technical, Workshops, Competitions, "
        "Cultural, Seminars), inspect real-time seat availability gauges, confirm registration with a single click, access a personalized pass "
        "dashboard, print standardized digital admission tickets, and cancel registrations if required."
    )
    pdf.add_paragraph(
        "Event Administrators operate a dedicated management dashboard equipped with analytical metric cards, event authoring and editing modals, "
        "capacity and deadline enforcement controls, and a participant roster viewer with CSV export functionality. Real-time atomic database "
        "operations guarantee that when a student confirms a booking, the event's registered count increments immediately, and if a ticket is cancelled, "
        "the seat is dynamically restored to the public pool."
    )
    pdf.add_paragraph(
        "By enforcing strict server-side validation, JWT authentication, and structured error handling, the proposed platform guarantees data "
        "integrity, eliminates overbooking, protects student privacy, and reduces administrative overhead by over 90%."
    )

    # =========================================================================
    # PAGE 8: 4. REQUIREMENTS SPECIFICATION (Doc Page 5)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("4. Requirements Specification")
    pdf.add_paragraph(
        "Requirements specification defines the functional capabilities, behavioral expectations, and quality constraints that the Online "
        "Event Registration System must satisfy to ensure successful deployment and user satisfaction."
    )
    pdf.add_paragraph(
        "The requirements are divided into two fundamental classifications:\n"
        "• Functional Requirements: Detail the explicit operational functions the software must perform, including authentication, catalog "
        "browsing, seat booking, ticket generation, and administrative oversight.\n"
        "• Non-Functional Requirements: Define quality attributes, security standards, performance thresholds, and operational constraints."
    )

    pdf.add_sub_title("4.1 Functional Requirements")
    frs_part1 = [
        ("FR1: User Registration", "The system shall allow new students to create an account with name, email, phone, college, and password."),
        ("FR2: Secure User Login", "The system shall authenticate registered users using verified credentials and issue secure JWT tokens."),
        ("FR3: Role Authorization", "The system shall restrict administrative modules exclusively to authorized admin accounts."),
        ("FR4: User Logout", "The system shall permit authenticated users to terminate their active session safely."),
        ("FR5: Event Catalog Display", "The system shall display all published campus events with title, category, date, venue, and seat quota."),
        ("FR6: Event Search", "The system shall provide instantaneous search across event titles, venues, and organizers."),
        ("FR7: Category Filtering", "The system shall filter events by domain (Workshops, Technical, Competitions, Cultural, Seminars)."),
        ("FR8: Real-Time Seat Status", "The system shall display remaining seat counts and dynamic progress indicators on event cards."),
        ("FR9: Event Details View", "The system shall render comprehensive event overviews, schedules, coordinators, and booking cards."),
        ("FR10: Seat Reservation", "The system shall allow authenticated students to register for open events having available capacity.")
    ]
    for tag, desc in frs_part1:
        pdf.add_bullet_point(tag, desc)

    # =========================================================================
    # PAGE 9: 4.1 CONTINUED & 4.2 NON-FUNCTIONAL REQS PART 1 (Doc Page 6)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    frs_part2 = [
        ("FR11: Duplicate Booking Prevention", "The system shall prevent a student from registering multiple times for the same event."),
        ("FR12: Capacity Lockout", "The system shall automatically transition an event to 'Seats Full' when registered count equals capacity."),
        ("FR13: Deadline Enforcement", "The system shall close registrations automatically once the designated cutoff date passes."),
        ("FR14: Digital Ticket Generation", "The system shall generate an official ticket pass with a unique verification ID (e.g., EVT-2026-XXXX)."),
        ("FR15: Student Pass Dashboard", "The system shall display a student's complete history of confirmed, completed, and cancelled tickets."),
        ("FR16: Ticket Self-Cancellation", "The system shall enable students to cancel confirmed tickets and release their reserved seat."),
        ("FR17: Admin Event Authoring", "The system shall allow administrators to create new events with full metadata, images, and seat limits."),
        ("FR18: Admin Event Management", "The system shall permit administrators to edit event details or permanently delete an event."),
        ("FR19: Participant Roster View", "The system shall allow administrators to inspect all registered attendees across events."),
        ("FR20: Data Export", "The system shall enable administrators to export registered participant rosters as structured CSV files.")
    ]
    for tag, desc in frs_part2:
        pdf.add_bullet_point(tag, desc)

    pdf.add_sub_title("4.2 Non-Functional Requirements")
    nfrs_1 = [
        ["Requirement", "Description"],
        ["Performance", "API endpoints shall respond within 200 milliseconds under standard campus network loads."],
        ["Security", "User passwords shall be hashed using bcrypt with salt rounds of 10. API endpoints shall validate JWT tokens."],
        ["Usability", "The user interface shall be self-explanatory, professional, responsive, and easy to navigate for all users."],
        ["Reliability", "The system shall guarantee atomic seat capacity updates to prevent data inconsistencies or race conditions."],
        ["Maintainability", "The application shall maintain clean separation between React components, controllers, models, and routes."]
    ]
    with pdf.table(col_widths=(40, 134), text_align=('LEFT', 'LEFT')) as table:
        for idx, row_data in enumerate(nfrs_1):
            row = table.row()
            if idx == 0:
                pdf.set_font('Arial', 'B', 8.5)
            else:
                pdf.set_font('Arial', '', 8.0)
            for cell_data in row_data:
                row.cell(cell_data)

    # =========================================================================
    # PAGE 10: 4.2 NON-FUNCTIONAL REQS PART 2 (Doc Page 7)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    nfrs_2 = [
        ["Requirement", "Description"],
        ["Scalability", "The MongoDB document store and Node.js asynchronous event loop shall scale horizontally to thousands of attendees."],
        ["Availability", "The web application shall maintain 99.9% uptime throughout campus fest registration weeks."],
        ["Compatibility", "The frontend shall function seamlessly on all modern web browsers (Chrome, Edge, Firefox, Safari) and mobile viewports."],
        ["Validation", "Both client-side and server-side validation shall intercept invalid email formats, missing fields, and date inconsistencies."],
        ["Portability", "The software shall be deployable on Windows, Linux, Docker containers, or cloud container services with zero code rewrites."]
    ]
    with pdf.table(col_widths=(40, 134), text_align=('LEFT', 'LEFT')) as table:
        for idx, row_data in enumerate(nfrs_2):
            row = table.row()
            if idx == 0:
                pdf.set_font('Arial', 'B', 8.5)
            else:
                pdf.set_font('Arial', '', 8.0)
            for cell_data in row_data:
                row.cell(cell_data)

    pdf.ln(5)
    pdf.add_paragraph(
        "Meeting these comprehensive non-functional requirements guarantees that the Online Event Registration System functions not merely "
        "as a static college demonstration, but as a dependable, production-style web application ready for live institutional adoption."
    )

    # =========================================================================
    # PAGE 11: 5. HARDWARE & SOFTWARE REQUIREMENTS PART 1 (Doc Page 8)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("5. Hardware and Software Requirements")
    pdf.add_paragraph(
        "To guarantee optimal execution, development responsiveness, and reliable database operations, the following minimum and recommended "
        "specifications have been established for the Online Event Registration System."
    )

    pdf.add_sub_title("5.1 Hardware Requirements")
    hw_reqs = [
        ("1. Processor", "Intel Core i3 / AMD Ryzen 3 or equivalent minimum; Intel Core i5 / AMD Ryzen 5 recommended for multi-threaded compilation and concurrent server instances."),
        ("2. RAM", "Minimum 4 GB RAM; 8 GB or 16 GB recommended to smoothly host the Node.js runtime, Vite HMR development server, and MongoDB background daemon concurrently."),
        ("3. Storage", "At least 10 GB of free hard disk or SSD storage for project source files, node_modules dependencies, database collections, and system build artifacts."),
        ("4. Display Resolution", "Standard 1366 x 768 pixels minimum; 1920 x 1080 Full HD recommended for optimal responsive dashboard inspection."),
        ("5. Network Interface", "Standard Ethernet LAN or 802.11ac Wi-Fi connection required for package downloads, REST communication, and multi-device testing.")
    ]
    for title, desc in hw_reqs:
        pdf.add_bullet_point(title, desc)

    pdf.add_sub_title("5.2 Software Requirements")
    sw_reqs_1 = [
        ("1. Operating System", "Windows 10 / 11 (64-bit), Ubuntu Linux 22.04 LTS+, or macOS Ventura/Sonoma."),
        ("2. Programming Languages", "JavaScript (ECMAScript 2026 / ES6+) on both client and server runtimes, HTML5, and CSS3 styling standards.")
    ]
    for title, desc in sw_reqs_1:
        pdf.add_bullet_point(title, desc)

    # =========================================================================
    # PAGE 12: 5.2 SOFTWARE REQS PART 2 (Doc Page 9)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    sw_reqs_2 = [
        ("3. Frontend Framework & Tooling", "React 19, Vite v8 (Hot Module Replacement build engine), Tailwind CSS v3 for utility-first styling, and Lucide React icons."),
        ("4. Backend Framework & Runtimes", "Node.js (v20+ / v24 LTS), Express.js (v4.21) web framework, and Axios client for REST API communication."),
        ("5. Database Management System", "MongoDB Community Server (v7.0+ / v8.0) NoSQL document store with Mongoose ODM (v8.12) for object schema modeling."),
        ("6. Security & Utilities", "JSON Web Tokens (jsonwebtoken v9) for stateless authorization, Bcrypt.js (v3.0) for salted password encryption, and Cors middleware."),
        ("7. Integrated Development Environment (IDE)", "Google Antigravity IDE / Visual Studio Code equipped with Tailwind CSS IntelliSense, ES7+ React snippets, and MongoDB extension."),
        ("8. Web Browsers", "Google Chrome (v120+), Microsoft Edge (v120+), or Mozilla Firefox for cross-browser testing and responsive inspection.")
    ]
    for title, desc in sw_reqs_2:
        pdf.add_bullet_point(title, desc)

    # =========================================================================
    # PAGE 13: 6. DATA FLOW DIAGRAMS - LEVEL 0 DFD (Doc Page 10)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("6. Data Flow Diagram")
    pdf.add_paragraph(
        "A Data Flow Diagram (DFD) visually maps how data enters, traverses, transforms, and is stored within the Online Event Registration System. "
        "It clarifies the boundaries of the system and identifies external interacting entities."
    )

    pdf.add_sub_title("6.1 Level 0 DFD (Context Diagram)")
    pdf.add_paragraph(
        "The Level 0 DFD provides the fundamental context view of the entire platform. The two external entities are the Student/Attendee and the "
        "Event Administrator. The central system receives credentials, event inquiries, registrations, and cancellations from students, while returning "
        "event catalogs, booking status, and admission tickets. Administrators supply event details and roster queries, receiving system statistics and participant data."
    )
    
    img_dfd0 = 'pdf_assets/dfd_level_0.png'
    if os.path.exists(img_dfd0):
        pdf.image(img_dfd0, x=22, y=82, w=166)

    # =========================================================================
    # PAGE 14: 6.2 LEVEL 1 DFD (Doc Page 11)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("6.2 Level 1 DFD")
    pdf.add_paragraph(
        "The Level 1 DFD decomposes the system into six major processes: 1.0 User Authentication, 2.0 Event Search & Catalog, 3.0 Registration & "
        "Seat Booking, 4.0 Ticket Generation, 5.0 Booking Cancellation & Seat Recovery, and 6.0 Admin Management & Analytics. These processes "
        "interact with three primary data stores: D1 User Database, D2 Event Database, and D3 Registration Database."
    )

    img_dfd1 = 'pdf_assets/dfd_level_1.png'
    if os.path.exists(img_dfd1):
        pdf.image(img_dfd1, x=24, y=62, w=162)

    # =========================================================================
    # PAGE 15: 6.3 LEVEL 2 DFD (Doc Page 12)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("6.3 Level 2 DFD")
    pdf.add_paragraph(
        "The Level 2 DFD decomposes process 3.0 (Event Registration & Seat Booking) into detailed operational subprocesses: 3.1 Validate User Session, "
        "3.2 Verify Seat Capacity & Deadline, 3.3 Check Duplicate Registration, and 3.4 Confirm Booking & Generate Admission Pass. This granular view "
        "illustrates how data integrity and capacity safeguards are enforced sequentially."
    )

    img_dfd2 = 'pdf_assets/dfd_level_2.png'
    if os.path.exists(img_dfd2):
        pdf.image(img_dfd2, x=22, y=75, w=166)

    pdf.set_y(245)
    pdf.set_font('Arial', 'I', 8.5)
    pdf.multi_cell(174, 4.5, "Note: Level 2 DFD illustrates the critical seat booking subsystem. Decomposing one core transaction process represents standard Software Engineering practice.", 0, 'C')

    # =========================================================================
    # PAGE 16: 7. SYSTEM ARCHITECTURE (Doc Page 13)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("7. System Architecture")
    pdf.add_paragraph(
        "The Online Event Registration System is structured as a modern N-tier layered web architecture. Each layer maintains high cohesion "
        "and loose coupling, allowing independent testing, maintainability, and scalability."
    )

    img_arch = 'pdf_assets/system_architecture.png'
    if os.path.exists(img_arch):
        pdf.image(img_arch, x=22, y=50, w=166)

    pdf.set_y(195)
    arch_layers = [
        ("User Layer", "Students and Event Administrators interact via responsive desktop, tablet, or smartphone web browsers."),
        ("Frontend Layer", "Engineered with React 19, Vite, and Tailwind CSS. Manages UI components, state, client routing, and instant transitions."),
        ("REST API Layer", "Express router maps HTTP endpoints (GET, POST, PUT, DELETE) transmitting JSON payloads with Bearer JWT tokens."),
        ("Application Layer", "Node.js controller logic executes authentication, role-based authorization, and input validation."),
        ("Business / Data Access Layer", "Mongoose ODM models enforce schema validations, capacity checks, and salted bcrypt password hashing."),
        ("Database Layer", "MongoDB multi-document store holds persistent collections for users, published events, and student registrations.")
    ]
    for layer, desc in arch_layers:
        pdf.add_bullet_point(layer, desc)

    # =========================================================================
    # PAGE 17: 8. MODULE DESCRIPTION PART 1 (Doc Page 14)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("8. Module Description")
    pdf.add_paragraph(
        "The Online Event Registration System is architected as modular components where each module encapsulates distinct business logic."
    )

    modules_1 = [
        ("8.1 Authentication & Authorization Module", 
         "Manages student account registration, credential authentication, and JWT session generation. Utilizes bcrypt with 10 salt rounds to hash passwords. Implements middleware guards to protect student and admin routes against unauthorized tampering."),
        
        ("8.2 Event Discovery & Catalog Module", 
         "Fetches and displays active campus events with metadata including title, category, date, timing, venue, organizer, and capacity. Renders responsive event cards with real-time seat gauges and deadline countdown badges."),
        
        ("8.3 Search & Category Filtering Module", 
         "Empowers students to filter the catalog instantaneously across technical workshops, hackathons, seminars, cultural fests, and sports. Supports live keyword searches by event title, venue, or coordinator without page reloads."),
        
        ("8.4 Event Details & Seat Booking Module", 
         "Presents complete event descriptions, contact coordinator details, and live seat booking status cards. Automatically reflects seat availability status: 'Open', 'Confirmed', 'Seats Full', or 'Registration Closed'."),
        
        ("8.5 Registration & Ticket Generation Module", 
         "Verifies user identity, enforces seat availability, checks for duplicate bookings, increments registered attendee counts atomically, and generates official digital admission passes bearing unique IDs (e.g., EVT-2026-101429)."),
        
        ("8.6 Student Pass Dashboard Module", 
         "Provides students with a dedicated console to review confirmed, attended, and cancelled registrations. Displays interactive metric cards (Total Registrations, Upcoming Passes, Attended Sessions) and pass printing options.")
    ]
    for title, desc in modules_1:
        pdf.add_sub_title(title)
        pdf.add_paragraph(desc)

    # =========================================================================
    # PAGE 18: 8. MODULE DESCRIPTION PART 2 (Doc Page 15)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    modules_2 = [
        ("8.7 Ticket Self-Cancellation Module", 
         "Permits registered students to withdraw from an event if their plans change. Once confirmed via modal, the status updates to 'Cancelled', and the seat capacity is dynamically restored to the public pool for other students."),
        
        ("8.8 Admin Event Management Module (CRUD)", 
         "Provides administrators with full lifecycle event management. Admins can create new campus events via an intuitive modal form, update schedules and venue allocations, or permanently delete outdated event records."),
        
        ("8.9 Admin Participant & Attendance Module", 
         "Allows administrators to search, filter, and inspect registered attendee rosters across events. Provides comprehensive attendee details (name, email, phone, college, pass ID) and one-click CSV roster export for event check-in desks."),
        
        ("8.10 Admin Dashboard & Analytics Module", 
         "Aggregates system-wide operational metrics, displaying total published events, lifetime student registrations, upcoming sessions, and verified participant headcounts on interactive visual indicator cards.")
    ]
    for title, desc in modules_2:
        pdf.add_sub_title(title)
        pdf.add_paragraph(desc)

    # =========================================================================
    # PAGE 19: 9. SYSTEM ANALYSIS - USE CASE DIAGRAM (Doc Page 16)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("9. System Analysis")
    pdf.add_paragraph(
        "System analysis examines user requirements, stakeholder roles, and functional boundaries to establish clear behavioral specifications "
        "prior to implementation."
    )

    pdf.add_sub_title("9.1 Use Case Diagram")
    pdf.add_paragraph(
        "The Use Case Diagram depicts interactions between the primary actors (Student/User and Event Administrator) and the system boundaries. "
        "Key relationships include searching events, registering for passes, generating tickets, cancelling bookings, creating events, and inspecting rosters."
    )

    img_uc = 'pdf_assets/use_case_diagram.png'
    if os.path.exists(img_uc):
        pdf.image(img_uc, x=22, y=68, w=166)

    # =========================================================================
    # PAGE 20: 9.2 USE CASE DESCRIPTIONS PART 1 (Doc Page 17)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("9.2 Use Case Description")

    ucs_1 = [
        ("UC-01: User Login", "Student / User, Administrator", 
         "The user enters registered email and password. The system verifies credentials via bcrypt, generates a signed JWT token, and redirects to the appropriate student or admin console."),
        
        ("UC-02: User Registration", "Student / User", 
         "A new student inputs their full name, college email, contact phone, department, and password. The system validates unique email constraints and establishes a new student record."),
        
        ("UC-03: Search & Filter Events", "Student / User, Administrator", 
         "The user enters keywords or selects category filter pills. The system dynamically updates the catalog display with matching event cards."),
        
        ("UC-04: View Event Details & Seat Status", "Student / User", 
         "The user selects an event. The system renders complete event agendas, venue details, coordinator contacts, and live seat capacity indicators."),
        
        ("UC-05: Register for Event", "Student / User", 
         "An authenticated student clicks 'Register Now'. The system verifies seat availability, prevents duplicate entries, reserves the seat, and generates an admission pass."),
        
        ("UC-06: View / Print Digital Ticket", "Student / User", 
         "The student opens their confirmed pass. The system renders an official admission card bearing the event details, student credentials, and verification code.")
    ]
    for code, actors, desc in ucs_1:
        pdf.set_font('Arial', 'B', 10)
        pdf.cell(0, 5.5, code, 0, 1, 'L')
        pdf.set_font('Arial', 'I', 9)
        pdf.cell(0, 5, f"Actor: {actors}", 0, 1, 'L')
        pdf.add_paragraph(desc, spacing=4.8)

    # =========================================================================
    # PAGE 21: 9.2 USE CASE DESCRIPTIONS PART 2 (Doc Page 18)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    ucs_2 = [
        ("UC-07: Cancel Registration", "Student / User", 
         "A registered student selects 'Cancel Registration' on their dashboard. Upon modal confirmation, the pass status updates to 'Cancelled' and the reserved seat is returned to the public quota."),
        
        ("UC-08: Create Campus Event", "Event Administrator", 
         "An authenticated administrator fills the event authoring modal with title, category, date, timing, venue, coordinator contact, seat capacity, and banner image. The system validates and publishes the event."),
        
        ("UC-09: Update Event Details", "Event Administrator", 
         "The administrator modifies venue, timing, or description for an existing event. The system commits changes and updates public catalog listings immediately."),
        
        ("UC-10: Delete Event", "Event Administrator", 
         "The administrator deletes an event record. The system cascades deletion across associated registrations and frees system resources."),
        
        ("UC-11: Inspect Participant Rosters", "Event Administrator", 
         "The administrator views all registered attendees across events, filtering by name, email, or pass ID for gate verification."),
        
        ("UC-12: Export Attendee Data", "Event Administrator", 
         "The administrator triggers a CSV export of registered attendees for offline attendance recording and certificate preparation.")
    ]
    for code, actors, desc in ucs_2:
        pdf.set_font('Arial', 'B', 10)
        pdf.cell(0, 5.5, code, 0, 1, 'L')
        pdf.set_font('Arial', 'I', 9)
        pdf.cell(0, 5, f"Actor: {actors}", 0, 1, 'L')
        pdf.add_paragraph(desc, spacing=4.8)

    # =========================================================================
    # PAGE 22: 10. UML DESIGN - CLASS DIAGRAM (Doc Page 19)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("10. UML Design")
    pdf.add_paragraph(
        "Unified Modeling Language (UML) provides standardized structural and behavioral visual models representing the object classes, "
        "runtime component lifecycles, and sequence interactions of the Online Event Registration System."
    )

    pdf.add_sub_title("10.1 Class Diagram")
    pdf.add_paragraph(
        "The Class Diagram represents the static object model of the system, defining primary domain classes (User, Event, Registration), "
        "their internal attributes, behavioral methods, and relational multiplicity associations."
    )

    img_class = 'pdf_assets/class_diagram.png'
    if os.path.exists(img_class):
        pdf.image(img_class, x=20, y=70, w=170)

    # =========================================================================
    # PAGE 23: 10.2 SEQUENCE DIAGRAMS - LOGIN & REGISTRATION (Doc Page 20)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("10.2 Sequence Diagram")
    pdf.add_paragraph(
        "Sequence Diagrams capture chronological message exchanges between actors, UI controllers, middleware services, and database layers."
    )

    img_seq_login = 'pdf_assets/sequence_login.png'
    if os.path.exists(img_seq_login):
        pdf.image(img_seq_login, x=22, y=42, w=166)

    img_seq_reg = 'pdf_assets/sequence_registration.png'
    if os.path.exists(img_seq_reg):
        pdf.image(img_seq_reg, x=22, y=160, w=166)

    # =========================================================================
    # PAGE 24: 10.2 SEQUENCE DIAGRAMS - ADMIN & CANCELLATION (Doc Page 21)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    img_seq_admin = 'pdf_assets/sequence_admin_event.png'
    if os.path.exists(img_seq_admin):
        pdf.image(img_seq_admin, x=22, y=30, w=166)

    img_seq_cancel = 'pdf_assets/sequence_cancellation.png'
    if os.path.exists(img_seq_cancel):
        pdf.image(img_seq_cancel, x=22, y=155, w=166)

    # =========================================================================
    # PAGE 25: 10.3 ACTIVITY DIAGRAMS (Doc Page 22)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("10.3 Activity Diagram")
    pdf.add_paragraph(
        "The Activity Diagram maps the step-by-step decision workflow of students discovering an event, checking seat quotas, authenticating, "
        "and confirming their digital admission pass."
    )

    img_act = 'pdf_assets/activity_registration.png'
    if os.path.exists(img_act):
        pdf.image(img_act, x=22, y=60, w=166)

    # =========================================================================
    # PAGE 26: 10.4 STATE DIAGRAM & COMPONENT INTRO (Doc Page 23)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("10.4 State Diagram")
    pdf.add_paragraph(
        "The State Diagram traces the lifecycle transitions of an event and its seat booking status: Draft -> Open -> Seats Full -> Closed."
    )

    img_state = 'pdf_assets/state_booking.png'
    if os.path.exists(img_state):
        pdf.image(img_state, x=22, y=55, w=166)

    pdf.set_y(180)
    pdf.add_section_title("10.5 Component Diagram")
    pdf.add_paragraph(
        "The Component Diagram models the high-level structural organization of software modules, depicting dependencies between client components, "
        "REST API controllers, security middlewares, and the MongoDB persistence layer."
    )

    # =========================================================================
    # PAGE 27: 10.5 COMPONENT DIAGRAM & DEPLOYMENT INTRO (Doc Page 24)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    img_comp = 'pdf_assets/component_diagram.png'
    if os.path.exists(img_comp):
        pdf.image(img_comp, x=22, y=35, w=166)

    pdf.set_y(195)
    pdf.add_section_title("10.6 Deployment Diagram")
    pdf.add_paragraph(
        "The Deployment Diagram illustrates the physical and network infrastructure hosting the Online Event Registration System across client "
        "browsers, application servers, and MongoDB database environments."
    )

    # =========================================================================
    # PAGE 28: 10.6 DEPLOYMENT DIAGRAM (Doc Page 25)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    img_dep = 'pdf_assets/deployment_diagram.png'
    if os.path.exists(img_dep):
        pdf.image(img_dep, x=22, y=60, w=166)

    # =========================================================================
    # PAGE 29: 11. TESTING & TEST PLAN (Doc Page 26)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("11. Testing")
    pdf.add_paragraph(
        "Testing represents a critical verification phase in Software Engineering. It guarantees that the Online Event Registration System behaves "
        "predictably, resists edge-case vulnerabilities, enforces capacity limits accurately, and handles errors gracefully."
    )

    pdf.add_sub_title("11.1 Test Plan")
    test_types = [
        ("1. Unit Testing", "Validates individual utility functions and controller logic in isolation (e.g., date formatting, password hashing, seat capacity calculations)."),
        ("2. White-Box Testing", "Examines the internal branch conditions, decision logic, and error handlers within authentication controllers and capacity validators."),
        ("3. Basis Path Testing", "Calculates cyclomatic complexity to execute all independent execution paths during seat booking, cancellation, and role authorization."),
        ("4. Black-Box Testing", "Verifies interface functionality strictly against input specifications without relying on internal code awareness (e.g., login forms, search filters)."),
        ("5. System Testing", "Executes complete end-to-end integration workflows connecting the React SPA, Express REST APIs, and MongoDB database.")
    ]
    for title, desc in test_types:
        pdf.add_bullet_point(title, desc)

    # =========================================================================
    # PAGE 30: 11.2 TEST CASES PART 1 (Doc Page 27)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("11.2 Test Plan and Sample Test Cases (Part 1)")

    pdf.set_font('Arial', 'B', 8)
    pdf.set_fill_color(245, 245, 245)
    pdf.set_draw_color(40, 40, 40)
    pdf.cell(14, 6.5, "TC ID", 1, 0, 'C', fill=True)
    pdf.cell(32, 6.5, "Test Case", 1, 0, 'C', fill=True)
    pdf.cell(34, 6.5, "Input Data", 1, 0, 'C', fill=True)
    pdf.cell(38, 6.5, "Expected Output", 1, 0, 'C', fill=True)
    pdf.cell(38, 6.5, "Actual Output", 1, 0, 'C', fill=True)
    pdf.cell(18, 6.5, "Status", 1, 1, 'C', fill=True)

    tcs_1 = [
        ("TC01", "Valid Student Login", "student@eventhub.edu", "200 OK + JWT Token", "Login successful", "Pass"),
        ("TC02", "Invalid Password", "student@eventhub.edu / wrong", "401 Unauthorized Error", "Incorrect password", "Pass"),
        ("TC03", "Missing Email Field", "email: '' / password: '123'", "Validation error alert", "Please provide email", "Pass"),
        ("TC04", "New User Registration", "Valid student details", "201 Created + Token", "Account created", "Pass"),
        ("TC05", "Duplicate Email Reg", "Existing user email", "400 Bad Request error", "Email already exists", "Pass"),
        ("TC06", "Event Search Filter", "Search query: 'Hackathon'", "Matching event cards", "Filtered results shown", "Pass"),
        ("TC07", "Category Tab Filter", "Category: 'Workshops'", "Workshops list only", "Workshops displayed", "Pass"),
        ("TC08", "Seat Availability", "Event with 59/60 seats", "Displays '59 of 60 left'", "59 of 60 left shown", "Pass"),
        ("TC09", "Valid Seat Booking", "Click 'Register Now'", "Unique Pass ID generated", "Confirmed ticket pass", "Pass"),
        ("TC10", "Duplicate Registration", "Student registers twice", "Rejects duplicate entry", "Already registered", "Pass"),
        ("TC11", "Seats Full Lockout", "Capacity reached (60/60)", "'Seats Full' tag shown", "Booking button disabled", "Pass"),
        ("TC12", "Deadline Passed", "Date > deadline", "'Registration Closed'", "Registrations locked", "Pass")
    ]
    pdf.set_font('Arial', '', 7.5)
    for tid, tc, inp, exp, act, st in tcs_1:
        pdf.cell(14, 6.2, tid, 1, 0, 'C')
        pdf.cell(32, 6.2, tc, 1, 0, 'L')
        pdf.cell(34, 6.2, inp, 1, 0, 'L')
        pdf.cell(38, 6.2, exp, 1, 0, 'L')
        pdf.cell(38, 6.2, act, 1, 0, 'L')
        pdf.cell(18, 6.2, st, 1, 1, 'C')

    # =========================================================================
    # PAGE 31: 11.2 TEST CASES PART 2 & VALIDATION TESTING (Doc Page 28)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("11.2 Test Plan and Sample Test Cases (Part 2)")

    pdf.set_font('Arial', 'B', 8)
    pdf.set_fill_color(245, 245, 245)
    pdf.set_draw_color(40, 40, 40)
    pdf.cell(14, 6.5, "TC ID", 1, 0, 'C', fill=True)
    pdf.cell(32, 6.5, "Test Case", 1, 0, 'C', fill=True)
    pdf.cell(34, 6.5, "Input Data", 1, 0, 'C', fill=True)
    pdf.cell(38, 6.5, "Expected Output", 1, 0, 'C', fill=True)
    pdf.cell(38, 6.5, "Actual Output", 1, 0, 'C', fill=True)
    pdf.cell(18, 6.5, "Status", 1, 1, 'C', fill=True)

    tcs_2 = [
        ("TC13", "Self-Cancellation", "Click 'Cancel' on pass", "Seat count decrements", "Seat released", "Pass"),
        ("TC14", "Digital Ticket Pass", "View confirmed pass", "Renders admission ticket", "Ticket displayed", "Pass"),
        ("TC15", "Student Dashboard", "Navigate to /dashboard", "Active passes displayed", "Renders my passes", "Pass"),
        ("TC16", "Admin Event Create", "Valid event form data", "201 Created + published", "Event created", "Pass"),
        ("TC17", "Admin Event Edit", "Update venue details", "Database updated", "Venue updated", "Pass"),
        ("TC18", "Admin Event Delete", "Confirm event deletion", "Cascades reg deletion", "Event removed", "Pass"),
        ("TC19", "Unauthorized Admin", "Student visits /admin/*", "Redirects to /dashboard", "Access denied", "Pass"),
        ("TC20", "Export Attendees", "Click 'Export CSV'", "Downloads .csv roster", "CSV file generated", "Pass"),
        ("TC21", "Password Update", "Profile change password", "Updates bcrypt hash", "Password updated", "Pass"),
        ("TC22", "Theme Mode Toggle", "Click Sun/Moon toggle", "Toggles light/dark theme", "Theme switched", "Pass"),
        ("TC23", "Instant Page Nav", "Click 'View Details'", "0ms instant render", "Zero lag navigation", "Pass"),
        ("TC24", "User Logout", "Click 'Logout' button", "Clears JWT & redirects", "Logged out safely", "Pass")
    ]
    pdf.set_font('Arial', '', 7.5)
    for tid, tc, inp, exp, act, st in tcs_2:
        pdf.cell(14, 6.2, tid, 1, 0, 'C')
        pdf.cell(32, 6.2, tc, 1, 0, 'L')
        pdf.cell(34, 6.2, inp, 1, 0, 'L')
        pdf.cell(38, 6.2, exp, 1, 0, 'L')
        pdf.cell(38, 6.2, act, 1, 0, 'L')
        pdf.cell(18, 6.2, st, 1, 1, 'C')

    pdf.ln(5)
    pdf.add_sub_title("Validation Testing Summary")
    pdf.add_paragraph(
        "All 24 test cases spanning authentication, catalog search, atomic seat reservation, ticket generation, administrative event CRUD, "
        "and security access control were executed and achieved 100% pass rates, validating system compliance with all software engineering requirements."
    )

    # =========================================================================
    # PAGE 32: 12. RESULTS - HOME PAGE (Doc Page 29)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("12. Results / Screenshots")
    pdf.add_paragraph(
        "The Online Event Registration System was deployed and rigorously tested. The following screenshots document the actual user interfaces, "
        "administrative consoles, digital tickets, and real-time operations of the platform."
    )

    pdf.add_sub_title("12.1 Home Page")
    img_p1 = 'pdf_assets/fig_12_1_homepage.png'
    if os.path.exists(img_p1):
        pdf.image(img_p1, x=22, y=60, w=166)

    pdf.set_y(235)
    pdf.set_font('Arial', 'B', 9.5)
    pdf.cell(0, 6, "Figure 12.1: Home Page of Online Event Registration System", 0, 1, 'C')
    pdf.add_paragraph(
        "The Home Page serves as the primary visual gateway to campus events, featuring a warm editorial hero banner, quick navigation, "
        "interactive statistics, and featured upcoming event cards."
    )

    # =========================================================================
    # PAGE 33: 12.2 REGISTRATION & LOGIN (Doc Page 30)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("12.2 Student Registration Page")
    img_p2 = 'pdf_assets/fig_12_2_registration.png'
    if os.path.exists(img_p2):
        pdf.image(img_p2, x=24, y=36, w=162)

    pdf.set_y(150)
    pdf.set_font('Arial', 'B', 9)
    pdf.cell(0, 5, "Figure 12.2: Student Account Registration Page", 0, 1, 'C')

    pdf.set_y(160)
    pdf.add_sub_title("12.3 Login Page with 1-Click Viva Demo Access")
    img_p3 = 'pdf_assets/fig_12_3_login.png'
    if os.path.exists(img_p3):
        pdf.image(img_p3, x=24, y=175, w=162)

    # =========================================================================
    # PAGE 34: 12.4 STUDENT DASHBOARD (Doc Page 31)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("12.4 Student Dashboard & Confirmed Passes")
    img_p4 = 'pdf_assets/fig_12_4_dashboard.png'
    if os.path.exists(img_p4):
        pdf.image(img_p4, x=22, y=55, w=166)

    pdf.set_y(230)
    pdf.set_font('Arial', 'B', 9.5)
    pdf.cell(0, 6, "Figure 12.4: Student Dashboard with Confirmed Admission Passes", 0, 1, 'C')
    pdf.add_paragraph(
        "The Student Dashboard displays real-time registration summaries (Total, Upcoming, Completed, Cancelled) and active tickets with one-click print actions."
    )

    # =========================================================================
    # PAGE 35: 12.5 EVENTS CATALOG (Doc Page 32)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("12.5 Events Catalog with Search & Category Filtering")
    img_p5 = 'pdf_assets/fig_12_5_events_catalog.png'
    if os.path.exists(img_p5):
        pdf.image(img_p5, x=22, y=55, w=166)

    pdf.set_y(230)
    pdf.set_font('Arial', 'B', 9.5)
    pdf.cell(0, 6, "Figure 12.5: Campus Events Catalog with Live Keyword Search", 0, 1, 'C')
    pdf.add_paragraph(
        "Students can dynamically search across titles, venues, and organizers, or filter by category pills with real-time seat availability gauges."
    )

    # =========================================================================
    # PAGE 36: 12.6 EVENT DETAILS & SEAT BOOKING CARD (Doc Page 33)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("12.6 Event Details & Real-Time Seat Booking Card")
    img_p6 = 'pdf_assets/fig_12_6_event_details.png'
    if os.path.exists(img_p6):
        pdf.image(img_p6, x=22, y=55, w=166)

    pdf.set_y(230)
    pdf.set_font('Arial', 'B', 9.5)
    pdf.cell(0, 6, "Figure 12.6: Event Details with High-Contrast Seat Booking Status", 0, 1, 'C')
    pdf.add_paragraph(
        "Displays event agendas, faculty coordinator contacts, live seat countdowns, deadline notices, and instant 1-click registration."
    )

    # =========================================================================
    # PAGE 37: 12.7 DIGITAL TICKET PASS (Doc Page 34)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("12.7 Official Digital Admission Ticket Pass with QR")
    img_p7 = 'pdf_assets/fig_12_7_digital_ticket.png'
    if os.path.exists(img_p7):
        pdf.image(img_p7, x=22, y=55, w=166)

    pdf.set_y(230)
    pdf.set_font('Arial', 'B', 9.5)
    pdf.cell(0, 6, "Figure 12.7: Digital Admission Pass Generated for Registered Attendee", 0, 1, 'C')
    pdf.add_paragraph(
        "Provides students with an official admission credential featuring attendee roll number, event venue, date, instructions, and QR code for check-in."
    )

    # =========================================================================
    # PAGE 38: 12.8 ADMIN CONSOLE & CRUD MODAL (Doc Page 35)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("12.8 Admin Console & Event Authoring Form")
    img_p8 = 'pdf_assets/fig_12_8_admin_dashboard.png'
    if os.path.exists(img_p8):
        pdf.image(img_p8, x=24, y=36, w=162)

    pdf.set_y(150)
    pdf.set_font('Arial', 'B', 9)
    pdf.cell(0, 5, "Figure 12.8: Administrator Event Management Console", 0, 1, 'C')

    pdf.set_y(160)
    img_p9 = 'pdf_assets/fig_12_9_admin_events.png'
    if os.path.exists(img_p9):
        pdf.image(img_p9, x=24, y=175, w=162)

    # =========================================================================
    # PAGE 39: 13. LIMITATIONS (Doc Page 36)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("13. Limitations")
    pdf.add_paragraph(
        "While the Online Event Registration System successfully fulfills all functional, operational, and architectural requirements "
        "stipulated for a collegiate event platform, certain technological limitations remain for future enhancement."
    )

    pdf.add_sub_title("13.1 Limited Advanced Payment Gateways")
    pdf.add_paragraph(
        "The current implementation is optimized for collegiate departmental events, technical workshops, and campus fests where admission "
        "is offered free of cost to enrolled students. Commercial payment gateways (e.g., Razorpay, Stripe, UPI QR collections) for paid public "
        "conferences or ticketed celebrity pro-nights are not embedded in this academic release. Future versions will integrate multi-currency "
        "payment gateways and automated invoice generation."
    )

    pdf.add_sub_title("13.2 Limited Deployment Scope")
    pdf.add_paragraph(
        "The application is engineered as a centralized platform for a single university campus. Multi-tenant architectural support—enabling "
        "hundreds of independent colleges to manage isolated subdomains and cross-college inter-university tournaments—is not included in "
        "this version. Advanced multi-region database sharding, offline attendance scanning mobile apps, and automated SMS gateway alerts "
        "can be integrated into subsequent production versions."
    )

    # =========================================================================
    # PAGE 40: 14. CONCLUSION (Doc Page 37)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("14. Conclusion")
    pdf.add_paragraph(
        "The Online Event Registration System delivers an efficient, secure, and modern digital platform that modernizes campus event coordination. "
        "By replacing paper registers, unmanaged circulars, and disconnected forms with a unified full-stack solution, the system ensures real-time "
        "seat transparency, eliminates overbooking, and protects student data privacy."
    )
    pdf.add_paragraph(
        "The project demonstrates the practical application of key Software Engineering principles throughout its development lifecycle—from "
        "structured requirements elicitation and rigorous system analysis (DFD, UML) to decoupled modular implementation (React, Node.js, MongoDB) "
        "and comprehensive validation testing."
    )
    pdf.add_paragraph(
        "The platform empowers students to discover and register for campus activities effortlessly while equipping administrators with automated "
        "capacity enforcement, participant tracking, and analytics. The project provides a dependable technological foundation that can be extended "
        "readily with automated attendance scanning, notification microservices, and multi-college federation in the future."
    )

    # =========================================================================
    # PAGE 41: 15. REFERENCES (Doc Page 38)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("15. References")
    
    pdf.add_sub_title("Books")
    books = [
        ("1. Roger S. Pressman and Bruce R. Maxim", "Software Engineering: A Practitioner's Approach, 9th Edition, McGraw-Hill Education."),
        ("2. Ian Sommerville", "Software Engineering, 10th Edition, Pearson Education."),
        ("3. Kyle Simpson", "You Don't Know JS: Scope & Closures / Async & Performance, O'Reilly Media."),
        ("4. Alex Banks and Eve Porcello", "Learning React: Modern Patterns for Developing React Applications, 2nd Edition, O'Reilly Media.")
    ]
    for auth, btitle in books:
        pdf.add_bullet_point(auth, btitle, bullet="[B]")

    pdf.ln(3)
    pdf.add_sub_title("Online Technical Documentation & Standards")
    online = [
        ("1. React Official Documentation", "https://react.dev — Component lifecycle, hooks, and virtual DOM architecture."),
        ("2. Node.js & Express.js Reference", "https://expressjs.com — REST API routing, middleware, and request/response pipelines."),
        ("3. MongoDB & Mongoose Manual", "https://mongoosejs.com — Document schemas, validation, indexing, and aggregation pipelines."),
        ("4. Tailwind CSS Framework Guide", "https://tailwindcss.com — Utility-first CSS architecture and responsive design standards."),
        ("5. Lucidchart & Visual Paradigm Guides", "UML Diagram Standards, Data Flow Diagram conventions, and software engineering modeling."),
        ("6. GeeksforGeeks Computer Science Portal", "Software Engineering methodologies, Basis Path Testing, and Black-Box validation techniques.")
    ]
    for src, url in online:
        pdf.add_bullet_point(src, url, bullet="[W]")

    # =========================================================================
    # PAGE 42: APPENDIX - A.1 ADDITIONAL SCREENSHOTS (Doc Page 39)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_section_title("Appendix")
    pdf.add_paragraph(
        "The appendix provides supplementary technical materials, administrative views, sample data payloads, and complete operational manuals."
    )

    pdf.add_sub_title("A.1 Additional Screenshots: Participant Management")
    img_p10 = 'pdf_assets/fig_12_10_admin_participants.png'
    if os.path.exists(img_p10):
        pdf.image(img_p10, x=22, y=60, w=166)

    pdf.set_y(230)
    pdf.set_font('Arial', 'B', 9.5)
    pdf.cell(0, 6, "Figure A.1: Administrator Registered Participants Roster & Export Console", 0, 1, 'C')
    pdf.add_paragraph(
        "Enables event coordinators to review student attendee details across events and export complete check-in rosters to CSV."
    )

    # =========================================================================
    # PAGE 43: APPENDIX - A.2 SAMPLE INPUTS & OUTPUTS (Doc Page 40)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("A.2 Sample Inputs and Outputs")
    pdf.add_paragraph(
        "The following sample transaction payloads illustrate how data is transmitted and returned across key system operations."
    )

    sample_runs = [
        ("Student Registration Request", 
         "Input: { name: 'Rahul Sharma', email: 'rahul.sharma@campus.edu', college: 'ANITS', phone: '+91 98765 43210' }\n"
         "Output: { success: true, message: 'Registration successful', token: 'eyJhbGciOi...', user: { role: 'user' } }"),
        
        ("Event Booking Transaction",
         "Input: POST /api/registrations/6ac3bef39c085d06a19e9df6 (Bearer JWT Token)\n"
         "Output: { success: true, registrationId: 'EVT-2026-101429', status: 'Confirmed', seatsRemaining: 59 }"),
        
        ("Event Creation Payload (Admin)",
         "Input: { title: 'Cloud Computing & DevOps Summit', category: 'Workshops', capacity: 100, venue: 'ECE Hall' }\n"
         "Output: { success: true, eventId: '6ac3d84a...', message: 'Event published successfully' }"),
        
        ("Ticket Self-Cancellation Request",
         "Input: DELETE /api/registrations/6ac3bef39c085d06a19e9df6 (Bearer JWT Token)\n"
         "Output: { success: true, message: 'Registration cancelled successfully. Seat capacity restored.' }")
    ]
    for title, text in sample_runs:
        pdf.set_font('Arial', 'B', 9.5)
        pdf.set_text_color(30, 30, 30)
        pdf.cell(0, 6, title, 0, 1, 'L')
        pdf.set_font('courier', '', 8)
        pdf.set_fill_color(248, 247, 243)
        pdf.set_draw_color(220, 220, 220)
        pdf.multi_cell(174, 4.8, text, 1, 'L', fill=True)
        pdf.ln(3)

    # =========================================================================
    # PAGE 44: APPENDIX - A.3 USER MANUAL - ADMIN GUIDE (Doc Page 41)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("A.3 User Manual - Administrator Guide")
    pdf.add_paragraph(
        "The following operational guide instructs campus coordinators on managing events and attendees through the admin console."
    )

    admin_steps = [
        ("Step 1: Administrator Login", "Navigate to /login, enter authorized administrator credentials (or click 'Admin Demo'), and submit."),
        ("Step 2: Access Management Console", "The system redirects to /admin/dashboard, presenting overall campus event statistics and active tables."),
        ("Step 3: Create New Campus Event", "Click '+ Create Event' button to open the event modal. Fill title, category, date, venue, capacity, and publish."),
        ("Step 4: Update Existing Event", "Click the 'Edit' action button alongside any event to adjust venue, timing, or seat limits as required."),
        ("Step 5: Monitor Real-Time Enrollment", "Inspect registered attendee counts directly on the event cards or analytics summary cards."),
        ("Step 6: Review Participant Rosters", "Navigate to /admin/participants to review student names, department affiliations, and issued pass IDs."),
        ("Step 7: Export Roster to CSV", "Click 'Export CSV Roster' to download offline check-in lists for physical entry verification on event day."),
        ("Step 8: Remove Outdated Event", "Click 'Delete' to retire an event. Confirm the safety modal to cascade cleanup across records."),
        ("Step 9: Secure Logout", "Click 'Sign Out' in the top navigation bar to terminate the active administrative session.")
    ]
    for step, desc in admin_steps:
        pdf.add_bullet_point(step, desc)

    # =========================================================================
    # PAGE 45: APPENDIX - A.3 USER MANUAL - STUDENT GUIDE (Doc Page 42)
    # =========================================================================
    pdf.add_page()
    pdf.set_y(22)
    pdf.add_sub_title("A.3 User Manual - Student / Attendee Guide")
    pdf.add_paragraph(
        "The following guide instructs students on discovering events, reserving seats, printing passes, and managing tickets."
    )

    student_steps = [
        ("Step 1: Explore College Events", "Open the homepage or navigate to /events to browse upcoming workshops, fests, and competitions."),
        ("Step 2: Filter and Search", "Use the search bar to find specific topics or select domain pills (Technical, Workshops, Cultural, Seminars)."),
        ("Step 3: Inspect Event Details", "Click 'View Details' on any card to examine schedules, venue locations, and faculty coordinator emails."),
        ("Step 4: Verify Seat Quota", "Check the live seat booking indicator. If seats remain, click the prominent 'Register Now (Free)' button."),
        ("Step 5: Student Authentication", "If not logged in, enter student credentials (or click 'Student Demo') to authenticate your identity."),
        ("Step 6: Review & Confirm", "Review participant details in the confirmation modal and click 'Confirm & Register' to lock in your seat."),
        ("Step 7: Access Digital Ticket", "The system issues an official admission pass featuring your unique Pass ID and gate instructions."),
        ("Step 8: Print / Save Ticket", "Click 'View / Print Ticket' to display or print the standardized entry pass for event check-in."),
        ("Step 9: Manage Passes & Cancel", "Visit /my-registrations to review all your tickets. Click 'Cancel' if you can no longer attend to free your seat.")
    ]
    for step, desc in student_steps:
        pdf.add_bullet_point(step, desc)

    pdf.set_y(260)
    pdf.set_font('Arial', 'B', 10)
    pdf.set_text_color(40, 100, 40)
    pdf.cell(0, 7, "*** End of Project Document ***", 0, 1, 'C')

    # Output file
    output_filename = "ONLINE_EVENT_REGISTRATION_SYSTEM_PROJECT_DOCUMENT.pdf"
    pdf.output(output_filename)
    print(f"Project document PDF successfully generated: {output_filename}")
    print(f"Total Pages: {pdf.page_no()}")

if __name__ == '__main__':
    build_pdf()
