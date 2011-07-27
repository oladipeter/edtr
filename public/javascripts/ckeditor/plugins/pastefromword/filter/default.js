﻿/*
 Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */

(function() {
    var a = CKEDITOR.htmlParser.fragment.prototype,b = CKEDITOR.htmlParser.element.prototype;
    a.onlyChild = b.onlyChild = function() {
        var h = this.children,i = h.length,j = i == 1 && h[0];
        return j || null;
    };
    b.removeAnyChildWithName = function(h) {
        var i = this.children,j = [],k;
        for (var l = 0; l < i.length; l++) {
            k = i[l];
            if (!k.name)continue;
            if (k.name == h) {
                j.push(k);
                i.splice(l--, 1);
            }
            j = j.concat(k.removeAnyChildWithName(h));
        }
        return j;
    };
    b.getAncestor = function(h) {
        var i = this.parent;
        while (i && !(i.name && i.name.match(h)))i = i.parent;
        return i;
    };
    a.firstChild = b.firstChild = function(h) {
        var i;
        for (var j = 0; j < this.children.length; j++) {
            i = this.children[j];
            if (h(i))return i; else if (i.name) {
                i = i.firstChild(h);
                if (i)return i;
            }
        }
        return null;
    };
    b.addStyle = function(h, i, j) {
        var n = this;
        var k,l = '';
        if (typeof i == 'string')l += h + ':' + i + ';'; else {
            if (typeof h == 'object')for (var m in h) {
                if (h.hasOwnProperty(m))l += m + ':' + h[m] + ';';
            } else l += h;
            j = i;
        }
        if (!n.attributes)n.attributes = {};
        k = n.attributes.style || '';
        k = (j ? [l,k] : [k,l]).join(';');
        n.attributes.style = k.replace(/^;|;(?=;)/, '');
    };
    CKEDITOR.dtd.parentOf = function(h) {
        var i = {};
        for (var j in this) {
            if (j.indexOf('$') == -1 && this[j][h])i[j] = 1;
        }
        return i;
    };
    var c = /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,d = /^(?:\b0[^\s]*\s*){1,4}$/,e = 0,f;
    CKEDITOR.plugins.pastefromword = {utils:{createListBulletMarker:function(h, i) {
        var j = new CKEDITOR.htmlParser.element('cke:listbullet'),k;
        if (!h) {
            h = 'decimal';
            k = 'ol';
        } else if (h[2]) {
            if (!isNaN(h[1]))h = 'decimal'; else if (/^[a-z]+$/.test(h[1]))h = 'lower-alpha'; else if (/^[A-Z]+$/.test(h[1]))h = 'upper-alpha'; else h = 'decimal';
            k = 'ol';
        } else {
            if (/[l\u00B7\u2002]/.test(h[1]))h = 'disc'; else if (/[\u006F\u00D8]/.test(h[1]))h = 'circle'; else if (/[\u006E\u25C6]/.test(h[1]))h = 'square'; else h = 'disc';
            k = 'ul';
        }
        j.attributes = {'cke:listtype':k,style:'list-style-type:' + h + ';'};
        j.add(new CKEDITOR.htmlParser.text(i));
        return j;
    },isListBulletIndicator:function(h) {
        var i = h.attributes && h.attributes.style;
        if (/mso-list\s*:\s*Ignore/i.test(i))return true;
    },isContainingOnlySpaces:function(h) {
        var i;
        return(i = h.onlyChild()) && /^(:?\s|&nbsp;)+$/.test(i.value);
    },resolveList:function(h) {
        var i = h.attributes,j;
        if ((j = h.removeAnyChildWithName('cke:listbullet')) && j.length && (j = j[0])) {
            h.name = 'cke:li';
            if (i.style)i.style = CKEDITOR.plugins.pastefromword.filters.stylesFilter([
                ['text-indent'],
                ['line-height'],
                [/^margin(:?-left)?$/,null,function(m) {
                    var n = m.split(' ');
                    m = n[3] || n[1] || n[0];
                    m = parseInt(m, 10);
                    if (!e && f && m > f)e = m - f;
                    i['cke:margin'] = f = m;
                }]
            ])(i.style, h) || '';
            var k = j.attributes,l = k.style;
            h.addStyle(l);
            CKEDITOR.tools.extend(i, k);
            return true;
        }
        return false;
    },convertToPx:(function() {
        var h = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document);
        CKEDITOR.document.getBody().append(h);
        return function(i) {
            if (c.test(i)) {
                h.setStyle('width', i);
                return h.$.clientWidth + 'px';
            }
            return i;
        };
    })(),getStyleComponents:(function() {
        var h = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>', CKEDITOR.document);
        CKEDITOR.document.getBody().append(h);
        return function(i, j, k) {
            h.setStyle(i, j);
            var l = {},m = k.length;
            for (var n = 0; n < m; n++)l[k[n]] = h.getStyle(k[n]);
            return l;
        };
    })(),listDtdParents:CKEDITOR.dtd.parentOf('ol')},filters:{flattenList:function(h) {
        var i = h.attributes,j = h.parent,k,l = 1;
        while (j) {
            j.attributes && j.attributes['cke:list'] && l++;
            j = j.parent;
        }
        switch (i.type) {case 'a':k = 'lower-alpha';break;
        }
        var m = h.children,n;
        for (var o = 0; o < m.length; o++) {
            n = m[o];
            var p = n.attributes;
            if (n.name in CKEDITOR.dtd.$listItem) {
                var q = n.children,r = q.length,s = q[r - 1];
                if (s.name in CKEDITOR.dtd.$list) {
                    m.splice(o + 1, 0, s);
                    s.parent = h;
                    if (!--q.length)m.splice(o, 1);
                }
                n.name = 'cke:li';
                p['cke:indent'] = l;
                f = 0;
                p['cke:listtype'] = h.name;
                k && n.addStyle('list-style-type', k, true);
            }
        }
        delete h.name;
        i['cke:list'] = 1;
    },assembleList:function(h) {
        var i = h.children,j,k,l,m,n,o,p,q,r;
        for (var s = 0; s < i.length; s++) {
            j = i[s];
            if ('cke:li' == j.name) {
                j.name = 'li';
                k = j;
                l = k.attributes;
                m = k.attributes['cke:listtype'];
                n = parseInt(l['cke:indent'], 10) || e && Math.ceil(l['cke:margin'] / e) || 1;
                l.style && (l.style = CKEDITOR.plugins.pastefromword.filters.stylesFilter([
                    ['list-style-type',m == 'ol' ? 'decimal' : 'disc']
                ])(l.style) || '');
                if (!p) {
                    p = new CKEDITOR.htmlParser.element(m);
                    p.add(k);
                    i[s] = p;
                } else {
                    if (n > r) {
                        p = new CKEDITOR.htmlParser.element(m);
                        p.add(k);
                        o.add(p);
                    } else if (n < r) {
                        var t = r - n,u;
                        while (t-- && (u = p.parent))p = u.parent;
                        p.add(k);
                    } else p.add(k);
                    i.splice(s--, 1);
                }
                o = k;
                r = n;
            } else p = null;
        }
        e = 0;
    },falsyFilter:function(h) {
        return false;
    },stylesFilter:function(h, i) {
        return function(j, k) {
            var l = [];
            j.replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(n, o, p) {
                o = o.toLowerCase();
                o == 'font-family' && (p = p.replace(/["']/g, ''));
                var q,r,s,t;
                for (var u = 0; u < h.length; u++) {
                    if (h[u]) {
                        q = h[u][0];
                        r = h[u][1];
                        s = h[u][2];
                        t = h[u][3];
                        if (o.match(q) && (!r || p.match(r))) {
                            o = t || o;
                            i && (s = s || p);
                            if (typeof s == 'function')s = s(p, k, o);
                            if (s && s.push)o = s[0],s = s[1];
                            if (typeof s == 'string')l.push([o,s]);
                            return;
                        }
                    }
                }
                !i && l.push([o,p]);
            });
            for (var m = 0; m < l.length; m++)l[m] = l[m].join(':');
            return l.length ? l.join(';') + ';' : false;
        };
    },elementMigrateFilter:function(h, i) {
        return function(j) {
            var k = i ? new CKEDITOR.style(h, i)._.definition : h;
            j.name = k.element;
            CKEDITOR.tools.extend(j.attributes, CKEDITOR.tools.clone(k.attributes));
            j.addStyle(CKEDITOR.style.getStyleText(k));
        };
    },styleMigrateFilter:function(h, i) {
        var j = this.elementMigrateFilter;
        return function(k, l) {
            var m = new CKEDITOR.htmlParser.element(null),n = {};
            n[i] = k;
            j(h, n)(m);
            m.children = l.children;
            l.children = [m];
        };
    },bogusAttrFilter:function(h, i) {
        if (i.name.indexOf('cke:') == -1)return false;
    },applyStyleFilter:null},getRules:function(h) {
        var i = CKEDITOR.dtd,j = CKEDITOR.tools.extend({}, i.$block, i.$listItem, i.$tableContent),k = h.config,l = this.filters,m = l.falsyFilter,n = l.stylesFilter,o = l.elementMigrateFilter,p = CKEDITOR.tools.bind(this.filters.styleMigrateFilter, this.filters),q = this.utils.createListBulletMarker,r = l.flattenList,s = l.assembleList,t = this.utils.isListBulletIndicator,u = this.utils.isContainingOnlySpaces,v = this.utils.resolveList,w = this.utils.convertToPx,x = this.utils.getStyleComponents,y = this.utils.listDtdParents,z = k.pasteFromWordRemoveFontStyles !== false,A = k.pasteFromWordRemoveStyles !== false;
        return{elementNames:[
            [/meta|link|script/,'']
        ],root:function(B) {
            B.filterChildren();
            s(B);
        },elements:{'^':function(B) {
            var C;
            if (CKEDITOR.env.gecko && (C = l.applyStyleFilter))C(B);
        },$:function(B) {
            var C = B.name || '',D = B.attributes;
            if (C in j && D.style)D.style = n([
                [/^(:?width|height)$/,null,w]
            ])(D.style) || '';
            if (C.match(/h\d/)) {
                B.filterChildren();
                if (v(B))return;
                o(k['format_' + C])(B);
            } else if (C in i.$inline) {
                B.filterChildren();
                if (u(B))delete B.name;
            } else if (C.indexOf(':') != -1 && C.indexOf('cke') == -1) {
                B.filterChildren();
                if (C == 'v:imagedata') {
                    var E = B.attributes['o:href'];
                    if (E)B.attributes.src = E;
                    B.name = 'img';
                    return;
                }
                delete B.name;
            }
            if (C in y) {
                B.filterChildren();
                s(B);
            }
        },style:function(B) {
            if (CKEDITOR.env.gecko) {
                var C = B.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/),D = C && C[1],E = {};
                if (D) {
                    D.replace(/[\n\r]/g, '').replace(/(.+?)\{(.+?)\}/g, function(F, G, H) {
                        G = G.split(',');
                        var I = G.length,J;
                        for (var K = 0; K < I; K++)CKEDITOR.tools.trim(G[K]).replace(/^(\w+)(\.[\w-]+)?$/g, function(L, M, N) {
                            M = M || '*';
                            N = N.substring(1, N.length);
                            if (N.match(/MsoNormal/))return;
                            if (!E[M])E[M] = {};
                            if (N)E[M][N] = H; else E[M] = H;
                        });
                    });
                    l.applyStyleFilter = function(F) {
                        var G = E['*'] ? '*' : F.name,H = F.attributes && F.attributes['class'],I;
                        if (G in E) {
                            I = E[G];
                            if (typeof I == 'object')I = I[H];
                            I && F.addStyle(I, true);
                        }
                    };
                }
            }
            return false;
        },p:function(B) {
            B.filterChildren();
            if (v(B))return;
            if (k.enterMode == CKEDITOR.ENTER_BR) {
                delete B.name;
                B.add(new CKEDITOR.htmlParser.element('br'));
            } else o(k['format_' + (k.enterMode == CKEDITOR.ENTER_P ? 'p' : 'div')])(B);
        },div:function(B) {
            var C = B.onlyChild();
            if (C && C.name == 'table') {
                var D = B.attributes;
                C.attributes = CKEDITOR.tools.extend(C.attributes, D);
                D.style && C.addStyle(D.style);
                var E = new CKEDITOR.htmlParser.element('div');
                E.addStyle('clear', 'both');
                B.add(E);
                delete B.name;
            }
        },td:function(B) {
            if (B.getAncestor('thead'))B.name = 'th';
        },ol:r,ul:r,dl:r,font:function(B) {
            if (!CKEDITOR.env.gecko && t(B.parent)) {
                delete B.name;
                return;
            }
            B.filterChildren();
            var C = B.attributes,D = C.style,E = B.parent;
            if ('font' == E.name) {
                CKEDITOR.tools.extend(E.attributes, B.attributes);
                D && E.addStyle(D);
                delete B.name;
            } else {
                D = D || '';
                if (C.color) {
                    C.color != '#000000' && (D += 'color:' + C.color + ';');
                    delete C.color;
                }
                if (C.face) {
                    D += 'font-family:' + C.face + ';';
                    delete C.face;
                }
                if (C.size) {
                    D += 'font-size:' + (C.size > 3 ? 'large' : C.size < 3 ? 'small' : 'medium') + ';';
                    delete C.size;
                }
                B.name = 'span';
                B.addStyle(D);
            }
        },span:function(B) {
            if (!CKEDITOR.env.gecko && t(B.parent))return false;
            B.filterChildren();
            if (u(B)) {
                delete B.name;
                return null;
            }
            if (!CKEDITOR.env.gecko && t(B)) {
                var C = B.firstChild(function(J) {
                    return J.value || J.name == 'img';
                }),D = C && (C.value || 'l.'),E = D.match(/^([^\s]+?)([.)]?)$/);
                return q(E, D);
            }
            var F = B.children,G = B.attributes,H = G && G.style,I = F && F[0];
            if (H)G.style = n([
                ['line-height'],
                [/^font-family$/,null,!z ? p(k.font_style, 'family') : null],
                [/^font-size$/,null,!z ? p(k.fontSize_style, 'size') : null],
                [/^color$/,null,!z ? p(k.colorButton_foreStyle, 'color') : null],
                [/^background-color$/,null,!z ? p(k.colorButton_backStyle, 'color') : null]
            ])(H, B) || '';
            return null;
        },b:o(k.coreStyles_bold),i:o(k.coreStyles_italic),u:o(k.coreStyles_underline),s:o(k.coreStyles_strike),sup:o(k.coreStyles_superscript),sub:o(k.coreStyles_subscript),a:function(B) {
            var C = B.attributes;
            if (C && !C.href && C.name)delete B.name;
        },'cke:listbullet':function(B) {
            if (B.getAncestor(/h\d/) && !k.pasteFromWordNumberedHeadingToList)delete B.name;
        }},attributeNames:[
            [/^onmouse(:?out|over)/,''],
            [/^onload$/,''],
            [/(?:v|o):\w+/,''],
            [/^lang/,'']
        ],attributes:{style:n(A ? [
            [/^margin$|^margin-(?!bottom|top)/,null,function(B, C, D) {
                if (C.name in {p:1,div:1}) {
                    var E = k.contentsLangDirection == 'ltr' ? 'margin-left' : 'margin-right';
                    if (D == 'margin')B = x(D, B, [E])[E]; else if (D != E)return null;
                    if (B && !d.test(B))return[E,B];
                }
                return null;
            }],
            [/^clear$/],
            [/^border.*|margin.*|vertical-align|float$/,null,function(B, C) {
                if (C.name == 'img')return B;
            }],
            [/^width|height$/,null,function(B, C) {
                if (C.name in {table:1,td:1,th:1,img:1})return B;
            }]
        ] : [
            [/^mso-/],
            [/-color$/,null,function(B) {
                if (B == 'transparent')return false;
                if (CKEDITOR.env.gecko)return B.replace(/-moz-use-text-color/g, 'transparent');
            }],
            [/^margin$/,d],
            ['text-indent','0cm'],
            ['page-break-before'],
            ['tab-stops'],
            ['display','none'],
            z ? [/font-?/] : null
        ], A),width:function(B, C) {
            if (C.name in i.$tableContent)return false;
        },border:function(B, C) {
            if (C.name in i.$tableContent)return false;
        },'class':m,bgcolor:m,valign:A ? m : function(B, C) {
            C.addStyle('vertical-align', B);
            return false;
        }},comment:!CKEDITOR.env.ie ? function(B, C) {
            var D = B.match(/<img.*?>/),E = B.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);
            if (E) {
                var F = E[1] || D && 'l.',G = F && F.match(/>([^\s]+?)([.)]?)</);
                return q(G, F);
            }
            if (CKEDITOR.env.gecko && D) {
                var H = CKEDITOR.htmlParser.fragment.fromHtml(D[0]).children[0],I = C.previous,J = I && I.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/),K = J && J[1];
                K && (H.attributes.src = K);
                return H;
            }
            return false;
        } : m};
    }};
    var g = function() {
        this.dataFilter = new CKEDITOR.htmlParser.filter();
    };
    g.prototype = {toHtml:function(h) {
        var i = CKEDITOR.htmlParser.fragment.fromHtml(h, false),j = new CKEDITOR.htmlParser.basicWriter();
        i.writeHtml(j, this.dataFilter);
        return j.getHtml(true);
    }};
    CKEDITOR.cleanWord = function(h, i) {
        if (CKEDITOR.env.gecko)h = h.replace(/(<!--\[if[^<]*?\])-->([\S\s]*?)<!--(\[endif\]-->)/gi, '$1$2$3');
        var j = new g(),k = j.dataFilter;
        k.addRules(CKEDITOR.plugins.pastefromword.getRules(i));
        i.fire('beforeCleanWord', {filter:k});
        try {
            h = j.toHtml(h, false);
        } catch(l) {
            alert(i.lang.pastefromword.error);
        }
        h = h.replace(/cke:.*?".*?"/g, '');
        h = h.replace(/style=""/g, '');
        h = h.replace(/<span>/g, '');
        return h;
    };
})();
