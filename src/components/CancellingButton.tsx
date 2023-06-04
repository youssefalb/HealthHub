import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Icon from '@mui/material/Icon';

export default function CancellingButton({ buttonText, onClick = () => { } }) {
    return (
            <div 
                className=' text-white inline-block bg-emerald-500 hover:bg-white border-2 hover:border-red-500 hover:text-black rounded-lg p-1  m-1 '
            >
            <DeleteForeverIcon 
                className='hover:cursor-pointer '
                    color='warning'
                    onClick={onClick}
                />
                {buttonText}
            </div>
    )
}