/**
 * @description: 时间日期格式化
 * @param {any} mydate
 * @param {any} pattern
 * @return {*}
 * @author: bb f
 */
export const dateFormat = function (mydate: any, pattern: any): string | void | any {
    if (typeof mydate !== 'object') {
        console.log('对象不是有效的时间对象');
        return mydate.toString();
    }
    /*初始化返回值字符串*/
    var returnValue = pattern;
    /*正则式pattern类型对象定义*/
    var format: any = {
        'y+': mydate.getFullYear(),
        'M+': mydate.getMonth() + 1,
        'd+': mydate.getDate(),
        'H+': mydate.getHours(),
        'm+': mydate.getMinutes(),
        's+': mydate.getSeconds(),
        S: mydate.getMilliseconds(),
        'q+': Math.floor((mydate.getMonth() + 3) / 3),
        'h+': mydate.getHours() % 12,
        a: mydate.getHours() / 12 <= 1 ? 'AM' : 'PM',
    };
    /*遍历正则式pattern类型对象构建returnValue对象*/
    for (var key in format) {
        var regExp = new RegExp('(' + key + ')');
        if (regExp.test(returnValue)) {
            var zero = '';
            for (var i = 0; i < RegExp.$1.length; i++) {
                zero += '0';
            }
            var replacement =
                RegExp.$1.length == 1
                    ? format[key]
                    : (zero + format[key]).substring(('' + format[key]).length);
            returnValue = returnValue.replace(RegExp.$1, replacement);
        }
    }
    return returnValue;
};

/**
 * 获得多少天前、后
 * @param date 时间 eg:202003010000 / 2020-03-01 00:00:00
 * @param days 天数
 * @param type 返回值类型
 * @returns {string|void|*}
 */
export const getPreDay = (
    date: string,
    days: number,
    type = 'yyyyMMddHH00'
): string | void | any => {
    let year = null,
        month = null,
        day = null,
        arr = [],
        hour = 0,
        min = 0;
    if (date.indexOf('-') === -1) {
        year = date.substr(0, 4); //获取当前日期的年份
        month = date.substr(4, 2); //获取当前日期的月份
        day = date.substr(6, 2); //获取当前日期的日
        hour = +date.substr(8, 2); //获取当前日期的小时
        min = +date.substr(10, 2); //获取当前日期的分钟
    } else {
        arr = date.split('-');
        year = arr[0]; //获取当前日期的年份
        month = arr[1]; //获取当前日期的月份
        day = arr[2].length > 2 ? arr[2].split(' ')[0] : arr[2]; //获取当前日期的日
        const time = arr[2].length > 2 ? arr[2].split(' ')[1].split(':') : null;
        if (time) {
            hour = +time[0]; //获取当前日期的小时
            min = +time[1]; //获取当前日期的分钟
        }
    }
    return dateFormat(
        new Date(
            new Date(+year, +month - 1, +day, +hour, +min).getTime() - 3600 * 1000 * 24 * days
        ),
        type
    );
};

/**
 * 节流函数 防止页面多次重复点击
 * @param fn
 * @param wait
 * @returns {function(...[*]=)}
 */
export const throttle = (fn: any, wait: number | undefined) => {
    let timeoutId: any = null,
        that = this;
    return function () {
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                fn.apply(that, arguments);
            }, wait);
        }
    };
};

/**
 * @description: 十进制 => 度分秒
 * @param {number} coordinate
 * @return {*}
 * @author: bb f
 */
export const formatToGPS = (coordinate: number[]): any => {
    const map = [
        ['E ', 'W '],
        ['N ', 'S '],
    ];
    const arr: string[] = [];
    coordinate.forEach((value, index) => {
        let result = '';
        let val: any = value;
        let prefix = map[index][val > 0 ? 0 : 1];

        val = Math.abs(val).toString();
        const split1: any = val.split('.');
        const degree = split1[0];
        result += degree + '°';
        if (split1[1]) {
            // @ts-ignore
            const split2: any = (`0.${split1[1]}` * 60).toString().split('.');
            const minute = split2[0];
            result += minute + '′';
            if (split2[1]) {
                // @ts-ignore
                const second = split2[1] ? (`0.${split2[1]}` * 60).toFixed(2) * 1 : '';
                result += second + '″';
            }
        }
        arr.push(result + prefix);
    });
    return arr;
};

export const formatLon2 = (lon: number) => {
    let pos = 'E';
    if (lon < 0) {
        pos = 'W';
    }
    let deg = Math.floor(lon);
    let min = Math.floor((lon - deg) * 60);
    let sec = Math.floor(((lon - deg) * 60 - min) * 60);
    return `${Math.abs(deg)}°${min}′${sec}″${pos}`;
};
export const formatLat2 = (lat: number) => {
    let pos = 'N';
    if (lat < 0) {
        pos = 'S';
    }
    let deg = Math.floor(lat);
    let min = Math.floor((lat - deg) * 60);
    let sec = Math.floor(((lat - deg) * 60 - min) * 60);
    return `${Math.abs(deg)}°${min}′${sec}″${pos}`;
};

// export const formatToDegree = (value:string[]) => {
//              ///<summary>度分秒转换成为度</summary>
//                 var du = value.split("°")[0];
//                 var fen = value.split("°")[1].split("'")[0];
//                 var miao = value.split("°")[1].split("'")[1].split('"')[0];
//                 return Math.abs(du) + "." + (Math.abs(fen)/60 + Math.abs(miao)/3600);
// }

/**
 * 深拷贝
 * @param obj
 * @returns
 */
export const deepCopy = (obj: any) => {
    let newObj: any = obj instanceof Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    }
    for (let i in obj) {
        newObj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
    }
    return newObj;
};

/**
 * 判断点是否在多边形内
 * @param point 点坐标
 * @param polygonPoints 多边形顶点坐标集合
 */
export const isInPolygon = (point: Array<any>, polygonPoints: Array<any>): boolean => {
    const count = polygonPoints.length;
    let inside: boolean = false;
    let p1, p2;
    for (let i = 0, j = count - 1; i < count; j = i, i++) {
        p1 = polygonPoints[i];
        p2 = polygonPoints[j];
        if (point[1] < p2[1]) {
            if (p1[1] <= point[1]) {
                if ((point[1] - p1[1]) * (p2[0] - p1[0]) > (point[0] - p1[0]) * (p2[1] - p1[1])) {
                    inside = !inside;
                }
            }
        } else if (point[1] < p1[1]) {
            if ((point[1] - p1[1]) * (p2[0] - p1[0]) < (point[0] - p1[0]) * (p2[1] - p1[1])) {
                inside = !inside;
            }
        }
    }
    return inside;
};

/**
 * key转成大写
 * @param jsonObj
 * @returns
 */
export const upperJSONKey = (jsonObj: any) => {
    for (var key in jsonObj) {
        jsonObj[key.toUpperCase()] = jsonObj[key];
        delete jsonObj[key];
    }
    return jsonObj;
};

//对象数组按照要素分组
export function groupBy<T>(array: T[], f: (arg0: any) => any): T[][] {
    const groups: any = {};
    array.forEach(function (o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
}

/**
 * 根据圆心找到圆的所有坐标
 * @param center 圆心坐标
 * @param cradius 半径
 * @returns
 */
export const getCirclePoints = (center: number[], cradius: number) => {
    const radius = cradius / 100;
    const pointNum = 30;
    const startAngle = 0,
        endAngle = 360,
        points = [];

    let sin, cos, x, y, angle;

    for (let i = 0; i <= pointNum; i++) {
        angle = startAngle + ((endAngle - startAngle) * i) / pointNum;
        sin = Math.sin((angle * Math.PI) / 180);
        cos = Math.cos((angle * Math.PI) / 180);
        x = center[0] + radius * sin;
        y = center[1] + radius * cos;
        points.push([x, y]);
    }

    return points;
};
