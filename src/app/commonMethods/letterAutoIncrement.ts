export class LetterAutoIncrement {

    public static nextChar(c: any) {
        var u = c.toUpperCase();
        if (this.same(u, 'Z')) {
            var txt = '';
            var i = u.length;
            while (i--) {
                txt += 'A';
            }
            return (txt + 'A');
        } else {
            var p = "";
            var q = "";
            if (u.length > 1) {
                p = u.substring(0, u.length - 1);
                q = String.fromCharCode(p.slice(-1).charCodeAt(0));
            }
            var l = u.slice(-1).charCodeAt(0);
            var z = this.nextLetter(l);
            if (z === 'A') {
                return p.slice(0, -1) + this.nextLetter(q.slice(-1).charCodeAt(0)) + z;
            } else {
                return p + z;
            }
        }
    }

    private static nextLetter(l: any) {
        if (l < 90) {
            return String.fromCharCode(l + 1);
        }
        else {
            return 'A';
        }
    }

    private static same(str: any, char: any) {
        var i = str.length;
        while (i--) {
            if (str[i] !== char) {
                return false;
            }
        }
        return true;
    }
}