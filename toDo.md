to protect a page use a protected layout that takes "role" as a prob and compares role of current user and either continues or redirects 



  - [x] check methods in each endpoint and accept only accurate methods 
  - [x] apply RESTful conventions 
  - [x] guard apis
  - [x] doctor endpoints
  - [√] Make the side bar a compenent and make it interactive according to user
  - [√] Make the appointements page reachable from the sidebar
  - [√] Make appointements list compenent
  - [x] make a userprofileimage as a component
  - [x] refractor the whole project (again)
  - [x] fix pages structre
  - [x] fix endpoints structure
  - [ ] write fokin guidlines for everyone and FORCE THEM to follow it 
  - [ ] loading conmponent
  - [ ] middleware 
  - [ ] no appointments --> component
  - [ ] prompt user at home page if he has no password to set it. and then set verified to true 
  - [ ] visit filter in doctor's page (sorted by date / time)
  - [ ] visit history for doctor's page 
  - [ ] notes on lab tests by doctor (optional)
  - [ ] search for auto-docs (swager, openApi)
  - [ ] fix examination endpoint
  - [ ] Eps only return one thing or everything
  - [ ] Lib functions do the inclusion with the other parts needed

  

  scenario: 
  1- (patient) register 
  2- (patient) add appointments 
  3- (doctor) changes status of visit (date/time)
  3- (doctor) add 3 new tests and 2 examinations (with date/time)
  4- (tech) performs 2 tests (results) and cancel 1 (reasons) (with date/time of each step)
  5- (supervisor) accept 1, deny 1 --> with reason ofc
  6- (registrar) makes a new visit 
  6- (doctor) accesses the results of all test + visit history 


scenario 2 : 
1- admin creating accounts for personnel 
2- admin revoking accounts for personnel 


proposed workflow: 

asser & victor : finish up visits endpoint according to his notes 
youssef : front end part for the tests page (which one?)
michal: start tests endpoint 
me and victor : help and then functions 
