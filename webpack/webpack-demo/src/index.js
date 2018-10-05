import Upper from '@/utils/util';
import styles from './styles/style';

console.log(styles);
debugger

let h1 = document.createElement('h1');
h1.innerHTML = Upper('this page is main!<br/>') + _.now();

document.getElementById('app').appendChild(h1);