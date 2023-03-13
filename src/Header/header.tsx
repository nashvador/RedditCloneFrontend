import React, { Fragment} from "react";
import { Button } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public'; 

const Header = () => {
    return (
        <Fragment>
            <Button>
                Log in
            </Button>
            <Button>
                Sign up
            </Button>
        </Fragment>
    )
}

export {Header}