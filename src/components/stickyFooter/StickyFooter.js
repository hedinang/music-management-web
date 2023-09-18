import { Fragment } from "react";

export default function StickyFooter ({children}){

        return <Fragment>
            <footer className='fixed bottom-0 w-[100%] left-0 p-5'>
                <div >{children}</div>
            </footer>
        </Fragment>
}
