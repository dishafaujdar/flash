import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import '../index.css';

const Header=()=> {

  const Navigate = useNavigate();

  const handleCreate=()=>{
    Navigate('/ManageCard');
  }
  const handlecards=()=>{
    Navigate('/cards');
  }
    return (
      
      <div className='header'>
      <header>
        <Typography style={{marginTop:'350px',fontSize:'larger',fontWeight:'bolder'}}><h1>TUF learning page with flip cards</h1></Typography>
        <button className='button' onClick={handleCreate}>create your own</button>
        <button className='button' onClick={handlecards}>go to cards section</button>
      </header>
      </div>
    );
  }

export default Header;