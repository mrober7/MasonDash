import layout from 'components/layout/layout';
import './index.scss';
import login from './components/login/login';
import cookieService from './services/cookieService';

const index = {
    init() {
        let page = location.pathname.substring(1);
        if (page !== 'login.html') {
            //check localstorage
            let masonUser = cookieService.get('mason-user');
            if (masonUser) {
                layout.init();
            } else {
                top.location = 'login.html';
            }
        } else {
            login.init();
        }
    },
};

index.init();