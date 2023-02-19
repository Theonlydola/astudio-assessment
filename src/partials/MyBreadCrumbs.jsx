import { Breadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';
function MyBreadCrumbs({ name, link }) {
    return (
        <div role="presentation" style={{marginTop: '30px'}}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={link}
                >
                    {name}
                </Link>
            </Breadcrumbs>
        </div>
    );
}

export default MyBreadCrumbs;