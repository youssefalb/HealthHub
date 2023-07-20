# HealthHub - Clinic and Hospital Management System

HealthHub is a comprehensive management system designed for clinics and hospitals with in-house testing facilities. This web application allows patients, doctors, laboratory technicians, supervisors, and receptionists to streamline their workflow and enhance communication within the healthcare facility.

## Features

### Patient

- Registration: Patients can create accounts and provide necessary personal information.
- Authentication: Sign in using credentials, Google account, or email verification link.
- Account Management: Update account details such as name, profile picture, insurance ID, national ID, etc.
- Appointment Booking: Patients can schedule appointments with doctors and include additional notes or messages.
- Messaging: Send and receive messages to/from their doctors for effective communication.
- Test History: Access and review previous test details and results.

### Doctor

- Upcoming Appointments: View a list of scheduled appointments.
- Visit Management: Start or cancel visits as required.
- Patient History: Access patients' test history and medical records.
- Ordering Tests: Place orders for laboratory tests and perform physical examinations.
- Communication: Send messages and reminders to patients.
- Test Status Tracking: Monitor the status of all tests ordered.

### Lab Assistant

- Test Management: View all ordered tests in a centralized list.
- Test Performance: Choose one or more tests to perform.
- Result Submission: Submit test results or cancel tests if necessary.

### Laboratory Supervisor

- Test Tracking: Monitor a comprehensive list of tests completed by lab assistants.
- Approval Process: Accept or reject tests and add relevant notes.

### Receptionist

- Appointment Management: Schedule appointments for patients.
- Appointment Tracking: Access a list of all appointments.
- Schedule Modification: Modify appointment dates, times, or cancel them when required.

## Usage

### Prerequisites

Ensure that you have Docker Engine installed. If not, you can install it from [here](https://www.docker.com/get-started).

### How to Run

1. Pull the Docker image: `docker pull claudeperrin228/healthhub:latest`
2. Run the image: `docker run -p 3000:3000 claudeperrin228/healthhub`
3. Open your web browser and go to [http://localhost:3000/](http://localhost:3000/) to access HealthHub.

## Feedback and Contributions

We welcome feedback and contributions from the community. If you encounter any issues or have suggestions for improvement, please submit an issue on GitHub or reach out to our development team.
