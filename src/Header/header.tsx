import React, { Fragment} from "react";
import { Button } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public'; 
import './header.css'


const Header = () => {
    return (
        <Fragment>
            <Button id="getRedButton">
                Get New Reddit
                <PublicIcon id="worldSymbol" />
            </Button>
        </Fragment>
    )
}

export {Header}