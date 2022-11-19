import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import iconCloseCardError from '../../assets/icons/icon-close-card-error.svg';
import { useGlobal } from '../../Contexts/GlobalContexts';
import './style.css';

export default function ErrorCard({ pag }) {
    const { errorCard, setErrorCard } = useGlobal();
    useEffect(() => {
        setTimeout(() => {
            setErrorCard("")
        }, 4000)
    }, []);
    return (
        <div className="div-error">
            <Stack
                variant="filled"
                sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error"
                    variant="filled"
                    sx={{
                        fontSize: '1.2rem',
                        backgroundColor: "var(--color-feed-back-red-5)",
                        color: "var(--color-feed-back-red-1)"
                    }}
                >
                    <div className='flex-row-center'>
                        {errorCard}
                        <img
                            onClick={() => setErrorCard("")}
                            className='icon-close-card'
                            src={iconCloseCardError}
                        />
                    </div>
                </Alert>
            </Stack>
        </div >

    );
}
