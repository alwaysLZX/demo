import Upper from '@/utils/util';
import './styles/style';

let h1 = document.createElement('h1');
h1.innerHTML = Upper('xieqian') + _.now();

document.getElementById('app').appendChild(h1);