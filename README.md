Problem statement: Design a basic 1 player TicTacToe game in React.

Functionality:
  ● Player opens the app(site), selects his symbol (‘X’, ‘O’) and clicks on one of the 9 empty boxes.
  ● As expected his symbol should get filled up in that box.
  ● Second player is a computer, which is available at the following API
       url: https://hiring-react-assignment.vercel.app/api/bot
       method: POST
       Request Body: [ null, "X", "O",null, "X", "O", "X", "O", null]
       Response: 8 (Box number computer wants to fill)

  ● If a player wins the game ends with the winner and the winning sequence is highlighted.

Constraints:
  ● Should use only React hooks.
  ● There should only be Functional components, no Class components.
  ● Only the box where change has happened should get re rendered. All the boxes or the whole app
     should not rerender on every click.