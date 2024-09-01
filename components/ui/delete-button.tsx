"use client";

import { Trash2 } from 'lucide-react';
import { DeleteMovie } from '../../app/actions/delete';


function DeleteButton({ id }: { id: number }) {

    async function handleClick() {
    await DeleteMovie(id);
  }
  return (
    <div>
      <button
        onClick={handleClick}
      >
        <Trash2 />
      </button>
    </div>
  );
}

export default DeleteButton;