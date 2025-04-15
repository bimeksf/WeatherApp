import React from 'react';
import { Icon } from '@iconify/react';

export default function SearchBar({handleForm, handleChange, inputText, inputFocus}) {
    return (<form onSubmit={handleForm} className='flex mt-10'>

  <div className='flex items-center'>
    <Icon icon="material-symbols:add-location-alt-rounded" width="30" height="30" />
      <input type="text" className="border-b-2 border-b-black focus:border-b-white focus:border-b-4 p-2 outline-0 dark:border-b-white" onChange={handleChange} value={inputText} 
      placeholder='Location' ref={inputFocus}  />
  </div>




    <button type='submit' className='bg-sky-800 p-2 text-white cursor-pointer rounded-md mx-2'><Icon icon="material-symbols:add-2-rounded" width="24" height="24" /></button>
  </form>);
  }
