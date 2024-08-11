import { useHref, useNavigate } from 'react-router-dom';
import '../App.css';

const Header=()=> {

  const Navigate = useNavigate();

  const handleCreate=()=>{
    Navigate('/ManageCard');
  }
  const handlecards=()=>{
    Navigate('/cards');
  }
    return (
      
      <div >
      <header>
        <h1>TUF learning page with flip cards</h1>
        <button onClick={handleCreate}>create your own</button>
        <button onClick={handlecards}>go to cards section</button>
      </header>
      </div>
    );
  }

export default Header;