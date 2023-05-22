test pages 
1- for patient : shows only "approved" belonging to this patient 

2- for doctor : shows all tests ordered by this doctor, regardless of the status but with showing the status in the card 

3- for tech: 2 pages : 
    1- all tests that are "ordered"
    2- tests that have "tech_id == his id" (those are the ones that has status == IN_PROGRESS)

4- for supervisor: 
    1- all tests that are "completed"
    2- tests that have "super_id == his id" (those are the ones that has status == approved or rejected)
