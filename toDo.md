to protect a page use a protected layout that takes "role" as a prob and compares role of current user and either continues or redirects 


  - [ ] front end for dynamic pages (asser)
  - [x] delete book appointmint button for a doctor 
  - [ ] visit filter in doctor's page (sorted by date / time) 
  - [ ] receptionist (everything)
  - [ ] make changing role of a user changes the connecttion (db ?)
  - [ ] loading conmponent
  - [ ] middleware 
  - [ ] search for auto-docs (swager, openApi)
  - [ ] prompt user at home page if he has no password to set it. and then set verified to true 

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
