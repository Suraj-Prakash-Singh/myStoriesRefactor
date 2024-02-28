perform crud in comments
init ui for crud @comments
create a way to distinguish if the current user can perform delete and edit in a comment
<br><b>Scenario:</b>
if currentUser owned the post -> perform delete comment
if currentUser owned the comment -> perform delete or edit
if currentUser owned post and comment -> perform both
