# Lilly Technical Challenge Documentation

## My Approach
For this project, I first broke down the task into several steps, as seen below.
#### Approaching the task
The first step to approaching this task was to carefully read the requirements to ensure I clearly understood the objectives. After reviewing the task, I organised the task into steps in this logical order:
1. Create the basic HTML of the page | 
By creating the basic HTML layout, I can determine the website's design and visualise how everything will flow, speeding up the development process.
2. Create the CSS for the HTML page | 
By designing the CSS for the page, I will have created a user-friendly design that allows me to better visualise and interact with the web app.
3. Get medicine list | 
By programming the medicine table, I will have enabled myself to visualise all the medicines, allowing me to visualise any further functionality and speeding up the debugging process.
4. Add new medicine | 
This step came next so I could create new medicines. It allows me to test the functionality of deleting and updating medications better, as I can directly add medications to test these features without having to adjust the database directly.
5. Delete medicine | 
Unlike the create medicine and medicine table functionality, this feature was not relied upon by any other component, so it is one of the last features to be added. 
6. Update medicine | 
Like the delete medicine feature, this feature was not relied on by any other component; therefore, I have placed this step near the end of development.
7. Average Price functionality | 
Once all of the required objectives are completed, I will complete the optional functionality in the Python backend and integrated it onto the client side.
8. Testing and polish | 
The last step is to conduct a final test and polish up any scripts I have used to ensure they are all functional and logical.
9. Refactor the code | 
My last step is to refactor my current code, ensuring it is presentable and readable, making it easy for other developers to understand. 

#### Method
For this challenge, I followed an iterative development approach. Conducting continuous testing at each stage will ensure that bugs are quickly identified and resolved early, preventing any major issues later in the development of this web app. 

#### Research
Before developing this web app, I quickly reviewed resources such as CSS/HTML on [W3Schools](https://W3Schools.com) to understand better how to complete this task, ensuring all objectives are met at a higher standard.

### Objectives
During my project's refactoring, I found areas of code that were redundant or didn't comply with the "Dry" (Don't Repeat Yourself) principle. Therefore, I found areas within my JS code where I could improve its modularity, as seen in the LoadMedicineTable() function.

### Problems Faced
1. During the development of the web app, I ran into an issue where the average price of the medicines didn't make sense from a user point of view; after some thinking and testing, I concluded that the issue arose because I excluded any medicine which has a name set to null from the medicine list, so the final price and count from the user's point of view was inaccurate compared to the backend result which doesn't filter out medicines without a name. To solve this issue, I had to adjust the LoadMedicineTable to include medicines with a name set to null; in this case, I used a ternary operator to set the name to "[unknown]", allowing the user to understand the average_price result better.
2. Another issue I faced while developing this web app was that the error tags would leave heavy padding around the surrounding elements, even when not "active". After some testing, I realised that to remove this bug, I had to set the style of the error tag to "Display: none," which made the UI styling more consistent and clean.  

### Evaluation
Overall, I felt confident about this challenge, which went smoothly since I have experience using HTML, CSS, and JS in past projects. The most challenging part of this project was making the page look presentable and user-friendly. However, there are some changes I would have made looking back on it, for example,
1. Having displayed the errors and information for table loading would have significantly helped the usability of the web app, as it would have allowed users to see if the web app has encountered any issues, for example, displaying any errors or notifying the user if the table is empty, making the software more reliable.
2. Another feature I wished I had changed was how I displayed the update and add medicine forms; instead of displaying these on the front page, I should have created a modal, reducing screen clutter when those features aren't required and having it as a simple button to open these modals, improving the pages flow.
3. Lastly, I would add more features to the table, for example, having pages instead of just listing all of the medicines at once; this would eliminate the need for the user to scroll down, keeping all the information and actions in sight instead of having to scroll back up. Furthermore, adding filter options to this table would have further improved usability as the user could quickly find what they want to see.