import util from '@/utils/util';
import  './styles/style.less';
import  './styles/common.less';
import apps from './styles/app.css';

let h1 = document.createElement('h1');
h1.className = apps.app1;
h1.innerHTML = util.upper('this page is main!!<br/>') + _.now();

document.getElementById('app').appendChild(h1);
