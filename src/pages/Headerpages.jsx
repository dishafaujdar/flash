import { useHref, useNavigate } from 'react-router-dom';

const Header=()=> {

  const Navigate = useNavigate();

  const handleCreate=()=>{
    Navigate('/ManageCard');
  }
  const handlecards=()=>{
    Navigate('/cards');
  }
    return (
      <header>
        <h1>TUF learning page with flip cards</h1>
        <button onClick={handleCreate}>create your own</button>
        <button onClick={handlecards}>go to cards section</button>
      </header>
    );
  }

export default Header;