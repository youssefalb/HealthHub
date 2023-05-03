## visits: 
- /api/visits
  if no params : gets all visits of the logged in user
  if params (patientId || doctorID) --> in case of logged in user == registrar || admin and she wants to check all visits for a patient or doctor

## labTests: 
- /api/tests/patient
  if no params : gets all tests belonging to that specific LOGGED IN Patient
  if params (patientId) --> in case of logged in user == registrar || doctor || admin and they want to check all tests for a patient

- /api/tests/doctor
  if no params : gets all tests belonging to that specific LOGGED IN Doctor
  if params (doctorId) --> in case of logged in user == registrar || admin and they want to check all tests for a doctor

- /api/tests/tech
  if no params : gets all tests belonging to that specific LOGGED IN labassistant
  if params (labAssistantId) --> in case of logged in user == registrar || labSupervisor || admin and they want to check all tests for a labassistant

- /api/tests/supervisor
  if no params : gets all tests belonging to that specific LOGGED IN Supervisor
  if params (labSupervisorId) --> in case of logged in user == registrar || admin and they want to check all tests for a Supervisor


## examinations: 
- /api/examinations/patient
  if no params : gets all examinations belonging to that specific LOGGED IN Patient
  if params (patientId) --> in case of logged in user == registrar || doctor || admin and they want to check all examinations for a patient

  - /api/examinations/doctor
  if no params : gets all tests belonging to that specific LOGGED IN Doctor
  if params (doctorId) --> in case of logged in user == registrar || admin and they want to check all examinations for a doctor

