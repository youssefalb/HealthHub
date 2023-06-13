to protect a page use a protected layout that takes "role" as a prob and compares role of current user and either continues or redirects 


  - [ ] front end for dynamic pages (asser)
  - [x] delete book appointmint button for a doctor 
  - [ ] receptionist (everything)
  - [ ] visit filter in doctor's page (sorted by date / time) 
  - [ ] middleware 
  - [ ] make changing role of a user changes the connecttion (db ?)
  - [ ] loading conmponent
  - [ ] search for auto-docs (swager, openApi)
  - [ ] prompt user at home page if he has no password to set it. and then set verified to true 

  scenario: 
  1-[x](patient) register 
  2-[x](patient) add appointments 
  3-[x](doctor) casynchanges status of visit (date/time)
  3-[x](doctor) add 3 new tests and 2 examinations (with date/time)
  4-[x](tech) performs 2 tests (results) and cancel 1 (reasons) (with date/time of each step)
  5-[x](supervisor) accept 1, deny 1 --> with reason ofc
  6-[ ](registrar) makes a new visit 
  7-[x](doctor) accesses the results of all test + visit history (kinda)


scenario 2 : 
1- admin creating accounts for personnel 
2- admin revoking accounts for personnel 





when choose a test : {
- [x] display its name in the select option 
- [x] clear the note
}
when wrote the note : 
- [x] save it in state

when press order: {
  - [x] push object to ordered test
  - [x] reset select
  - [x] disable previously chosen test
}

button disabled when nothing chosen 
delete hover should be on icon 
