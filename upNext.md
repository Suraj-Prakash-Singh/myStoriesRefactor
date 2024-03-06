perform crud in comments
init ui for crud @comments
create a way to distinguish if the current user can perform delete and edit in a comment
<br><b>Scenario:</b>
if currentUser owned the post -> perform delete comment
if currentUser owned the comment -> perform delete or edit
if currentUser owned post and comment -> perform both
<br>
status: <b>DONE</b>
<br>

create delete and edit fn

@delete
create slice for querying delete
create onClickHandlerForDelete
pass the currentUserId
create endpoint @api

<br>
status: <b>DONE</b>
<br>

init editComment
Bugs:

- didn't update the time ago : <b>DONE</b>
- didin't close all the poppers : <b>DONE</b>

after editComment -> perform crud for posts

<!-- create a way to separate -->
