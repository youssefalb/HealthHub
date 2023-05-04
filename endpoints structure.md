## visits: [√]
- [x] /api/visits/patient (PLURAL GET)
  if no params : gets all visits of the logged in PATIENT
  if params (patientId) --> in case of logged in user == DOCTOR and he wants to check all visits for a patient (history) - [√]  
-[x] /api/visits/patient/${id} (SINGULAR GET) --> 
  returns a specific visit if (PATIENT && CORRECT PATENT) [√]

- [x] /api/visits/doctor (GET PLURAL) [√]
  if no params : gets all visits of the logged in DOCTOR
  if params (doctorId) --> in case of logged in user == admin || regestrar and they want to check all visits for a doctor (history) (include whatever we need)
  -[√] /api/visits/doctor/${id} (get singular) --> 
  returns a specific visit if (DOCTOR) [√]

## labTests: 
- [x] /api/tests/patient  (GET plural)
  if no params : gets all tests belonging to that specific LOGGED IN Patient
  if params (patientId) --> in case of logged in user == registrar || doctor || admin and they want to check all tests for a patient
  - /api/tests/patient/${id} (get singular)--> 
  no params : returns a specific test IFF (PATIENT && CORRECT PATENT)

- [x] /api/tests/doctor (GET plural)
  if no params : gets all tests belonging to that specific LOGGED IN Doctor
  if params (doctorId) --> in case of logged in user == registrar || admin and they want to check all tests for a doctor
  - /api/tests/doctor/${id} (get singular)--> returns a specific test IFF (DOCTOR)

- [x] /api/tests/technician (GET plural)
  if no params : gets all tests that have status == ORDERED
  if params (labAssistantId) --> in case of logged in user == registrar || admin and they want to check all tests for a labassistant
  - [x] /api/tests/technician/${id} (GET SINGULAR) --> 
  no params: returns a specific test IFF (techID = test.techID ) 

- [x] /api/tests/technician/in-progress (GET PLURAL)
  no params : gets all tests that have (STATUS == IN-PROGRESS & TECHID == HIS ID)

- [x] /api/tests/supervisor (GET PLURAL)
  if no params : gets all tests that have (status == completed)
  if params (labSupervisorId) --> in case of logged in user == registrar || admin and they want to check all tests (approved || rejected) by a specific Supervisor
- [x] /api/tests/supervisor/${id} (GET SINGULAR) --> 
  no params: returns a specific test if (SUPERVISOR && completed)


## examinations: 
- [x] /api/examinations/patient (GET PLURAL)
  if no params : gets all examinations belonging to that specific LOGGED IN Patient
  if params (patientId) --> in case of logged in user == registrar || doctor || admin and they want to check all examinations for a patient
  - [x] /api/examinations/patient/${id} (GET SINGULAR)--> 
  no params: returns a specific exam IFF ( PATIENT & &CORRECT PATIENT)

  - [x] /api/examinations/doctor (GET PLURAL)
  if no params : gets all tests belonging to that specific LOGGED IN Doctor
  if params (doctorId) --> in case of logged in user == registrar || admin and they want to check all examinations for a doctor
- [x] /api/examinations/doctor/${id} (GET SINGULAR) --> 
  no params: returns a specific exam IFF (DOCTOR)

