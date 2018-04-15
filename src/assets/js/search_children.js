/**
 * Created by jackqqxu on 2016/4/22.
 */
var _base = '//qzonestyle.gtimg.cn/qzone/v6/portal/';
var QZONE = window.QZONE || {};

function imagezoom(imgobj, box_w, box_h) {
    var src_w = imgobj.width;
    var src_h = imgobj.height;
    var r1 = src_w / src_h,
        r2 = box_w / box_h;
    var dst_w, dst_h;
    if (r1 > r2) {
        dst_w = box_w;
        dst_h = Math.round(dst_w / src_w * src_h);
    } else {
        if (r1 < r2) {
            dst_h = box_h;
            dst_w = Math.round(dst_h / src_h * src_w);
        } else {
            dst_w = box_w;
            dst_h = box_h;
        }
    }
    imgobj.style.marginLeft = (box_w - dst_w) / 2 + "px";
    imgobj.style.marginTop = (box_h - dst_h) / 2 + "px";
    imgobj.style.width = dst_w + "px";
    imgobj.style.height = dst_h + "px";
    imgobj.style.opacity = 1;
}
(function(e, f) {
    
    var $scope = {}; //c
    var current; //p
    var tmnow; //r
    var chId; //s
    var cityList="|\u77F3\u5BB6\u5E84|\u5510\u5C71|\u79E6\u7687\u5C9B|\u90AF\u90F8|\u90A2\u53F0|\u4FDD\u5B9A|\u5F20\u5BB6\u53E3|\u627F\u5FB7|\u6CA7|\u5ECA\u574A|\u8861\u6C34|\u592A\u539F|\u5927\u540C|\u9633\u6CC9|\u957F\u6CBB|\u664B\u57CE|\u6714|\u664B\u4E2D|\u8FD0\u57CE|\u5FFB|\u4E34\u6C7E|\u5415\u6881|\u547C\u548C\u6D69\u7279|\u5305\u5934|\u4E4C\u6D77|\u8D64\u5CF0|\u901A\u8FBD|\u9102\u5C14\u591A\u65AF|\u547C\u4F26\u8D1D\u5C14|\u5DF4\u5F66\u6DD6\u5C14|\u4E4C\u5170\u5BDF\u5E03|\u9521\u6797\u90ED\u52D2\u76DF|\u963F\u62C9\u5584\u76DF|\u5174\u5B89\u76DF|\u5357\u4EAC|\u65E0\u9521|\u5F90|\u5E38|\u82CF|\u5357\u901A|\u8FDE\u4E91\u6E2F|\u6DEE\u5B89|\u76D0\u57CE|\u626C|\u9547\u6C5F|\u6CF0|\u5BBF\u8FC1|\u5408\u80A5|\u829C\u6E56|\u868C\u57E0|\u6DEE\u5357|\u9A6C\u978D\u5C71|\u6DEE\u5317|\u94DC\u9675|\u5B89\u5E86|\u9EC4\u5C71|\u6EC1|\u961C\u9633|\u5BBF|\u5DE2\u6E56|\u516D\u5B89|\u4EB3|\u6C60|\u5BA3\u57CE|\u6D4E\u5357|\u9752\u5C9B|\u6DC4\u535A|\u67A3\u5E84|\u4E1C\u8425|\u6F4D\u574A|\u70DF\u53F0|\u5A01\u6D77|\u6D4E\u5B81|\u6CF0\u5B89|\u65E5\u7167|\u83B1\u829C|\u4E34\u6C82|\u5FB7|\u804A\u57CE|\u6EE8|\u83CF\u6CFD|\u6C88\u9633|\u5927\u8FDE|\u978D\u5C71|\u629A\u987A|\u672C\u6EAA|\u4E39\u4E1C|\u9526|\u8425\u53E3|\u961C\u65B0|\u8FBD\u9633|\u76D8\u9526|\u94C1\u5CAD|\u671D\u9633|\u846B\u82A6\u5C9B|\u957F\u6625|\u5409\u6797|\u56DB\u5E73|\u8FBD\u6E90|\u901A\u5316|\u767D\u5C71|\u677E\u539F|\u767D\u57CE|\u5EF6\u8FB9|\u54C8\u5C14\u6EE8|\u9F50\u9F50\u54C8\u5C14|\u9E21\u897F|\u9E64\u5C97|\u53CC\u9E2D\u5C71|\u5927\u5E86|\u4F0A\u6625|\u7261\u4E39\u6C5F|\u4F73\u6728\u65AF|\u4E03\u53F0\u6CB3|\u9ED1\u6CB3|\u7EE5\u5316|\u5927\u5174\u5B89\u5CAD\u5730\u533A|\u676D|\u5B81\u6CE2|\u6E29|\u5609\u5174|\u6E56|\u7ECD\u5174|\u91D1\u534E|\u8862|\u821F\u5C71|\u53F0|\u4E3D\u6C34|\u5357\u660C|\u666F\u5FB7\u9547|\u840D\u4E61|\u4E5D\u6C5F|\u65B0\u4F59|\u9E70\u6F6D|\u8D63|\u5409\u5B89|\u5B9C\u6625|\u629A|\u4E0A\u9976|\u798F|\u53A6\u95E8|\u8386\u7530|\u4E09\u660E|\u6CC9|\u6F33|\u5357\u5E73|\u9F99\u5CA9|\u5B81\u5FB7|\u6B66\u6C49|\u9EC4\u77F3|\u8944\u6A0A|\u5341\u5830|\u8346|\u5B9C\u660C|\u8346\u95E8|\u9102|\u5B5D\u611F|\u9EC4\u5188|\u54B8\u5B81|\u968F|\u6069\u65BD|\u4ED9\u6843|\u5929\u95E8|\u6F5C\u6C5F|\u795E\u519C\u67B6\u6797\u533A|\u957F\u6C99|\u682A\u6D32|\u6E58\u6F6D|\u8861\u9633|\u90B5\u9633|\u5CB3\u9633|\u5E38\u5FB7|\u5F20\u5BB6\u754C|\u76CA\u9633|\u90F4|\u6C38|\u6000\u5316|\u5A04\u5E95|\u6E58\u897F|\u90D1|\u5F00\u5C01|\u6D1B\u9633|\u5E73\u9876\u5C71|\u7126\u4F5C|\u9E64\u58C1|\u65B0\u4E61|\u5B89\u9633|\u6FEE\u9633|\u8BB8\u660C|\u6F2F\u6CB3|\u4E09\u95E8\u5CE1|\u5357\u9633|\u5546\u4E18|\u4FE1\u9633|\u5468\u53E3|\u9A7B\u9A6C\u5E97|\u6D4E\u6E90|\u5E7F|\u6DF1\u5733|\u73E0\u6D77|\u6C55\u5934|\u97F6\u5173|\u6CB3\u6E90|\u6885|\u60E0|\u6C55\u5C3E|\u4E1C\u839E|\u4E2D\u5C71|\u6C5F\u95E8|\u4F5B\u5C71|\u9633\u6C5F|\u6E5B\u6C5F|\u8302\u540D|\u8087\u5E86|\u6E05\u8FDC|\u6F6E|\u63ED\u9633|\u4E91\u6D6E|\u5357\u5B81|\u67F3|\u6842\u6797|\u68A7|\u5317\u6D77|\u9632\u57CE\u6E2F|\u94A6|\u8D35\u6E2F|\u7389\u6797|\u767E\u8272|\u8D3A|\u6CB3\u6C60|\u6765\u5BBE|\u5D07\u5DE6|\u6D77\u53E3|\u4E09\u4E9A|\u4E94\u6307\u5C71|\u743C\u6D77|\u510B|\u6587\u660C|\u4E07\u5B81|\u4E1C\u65B9|\u6F84\u8FC8|\u5B9A\u5B89|\u5C6F\u660C|\u4E34\u9AD8|\u767D\u6C99|||||||||||||||||||||||||||||||\u6210\u90FD|\u81EA\u8D21|\u6500\u679D\u82B1|\u6CF8|\u5FB7\u9633|\u7EF5\u9633|\u5E7F\u5143|\u9042\u5B81|\u5185\u6C5F|\u4E50\u5C71|\u5357\u5145|\u5B9C\u5BBE|\u5E7F\u5B89|\u8FBE|\u7709\u5C71|\u96C5\u5B89|\u5DF4\u4E2D|\u8D44\u9633|\u963F\u575D|\u7518\u5B5C|\u51C9\u5C71|\u8D35\u9633|\u516D\u76D8\u6C34|\u9075\u4E49|\u5B89\u987A|\u94DC\u4EC1\u5730\u533A|\u6BD5\u8282\u5730\u533A|\u9ED4\u897F\u5357|\u9ED4\u4E1C\u5357|\u9ED4\u5357|\u6606\u660E|\u66F2\u9756|\u7389\u6EAA|\u4FDD\u5C71|\u662D\u901A|\u4E3D\u6C5F|\u601D\u8305|\u4E34\u6CA7|\u6587\u5C71|\u7EA2\u6CB3|\u897F\u53CC\u7248\u7EB3|\u695A\u96C4|\u5927\u7406|\u5FB7\u5B8F|\u6012\u6C5F|\u8FEA\u5E86|\u62C9\u8428|\u90A3\u66F2\u5730\u533A|\u660C\u90FD\u5730\u533A|\u5C71\u5357\u5730\u533A|\u65E5\u5580\u5219\u5730\u533A|\u963F\u91CC\u5730\u533A|\u6797\u829D\u5730\u533A|\u897F\u5B89|\u94DC\u5DDD|\u5B9D\u9E21|\u54B8\u9633|\u6E2D\u5357|\u5EF6\u5B89|\u6C49\u4E2D|\u6986\u6797|\u5B89\u5EB7|\u5546\u6D1B|\u5170|\u91D1\u660C|\u767D\u94F6|\u5929\u6C34|\u5609\u5CEA\u5173|\u6B66\u5A01|\u5F20\u6396|\u5E73\u51C9|\u9152\u6CC9|\u5E86\u9633|\u5B9A\u897F|\u9647\u5357|\u4E34\u590F|\u7518\u5357|\u94F6\u5DDD|\u77F3\u5634\u5C71|\u5434\u5FE0|\u56FA\u539F|\u4E2D\u536B|\u897F\u5B81|\u6D77\u4E1C\u5730\u533A|\u6D77\u5317|\u9EC4\u5357|\u6D77\u5357|\u679C\u6D1B|\u7389\u6811|\u6D77\u897F|\u4E4C\u9C81\u6728\u9F50|\u514B\u62C9\u739B\u4F9D|\u5410\u9C81\u756A\u5730\u533A|\u54C8\u5BC6\u5730\u533A|\u548C\u7530\u5730\u533A|\u963F\u514B\u82CF\u5730\u533A|\u5580\u4EC0\u5730\u533A|\u514B\u5B5C\u52D2\u82CF\u67EF|\u5DF4\u97F3\u90ED\u695E|\u660C\u5409|\u535A\u5C14\u5854\u62C9|\u4F0A\u7281|\u5854\u57CE\u5730\u533A|\u963F\u52D2\u6CF0\u5730\u533A|\u77F3\u6CB3\u5B50|\u963F\u62C9\u5C14|||\u53F0\u5317|\u9AD8\u96C4|\u53F0\u4E2D|\u82B1\u83B2|\u57FA\u9686|\u5609\u4E49|\u91D1\u95E8|\u8FDE\u6C5F|\u82D7\u6817|\u5357\u6295|\u6F8E\u6E56|\u5C4F\u4E1C|\u53F0\u4E1C|\u53F0\u5357|\u6843\u56ED|\u65B0\u7AF9|\u5B9C\u5170|\u4E91\u6797|\u5F70\u5316|\u5317\u4EAC|\u4E0A\u6D77|\u5929\u6D25|\u91CD\u5E86|\u9999\u6E2F|\u6FB3\u95E8".split("|");
    var provList="|\u5317\u4EAC|\u5929\u6D25|\u6CB3\u5317|\u5C71\u897F|\u5185\u8499\u53E4|\u6C5F\u82CF|\u5B89\u5FBD|\u5C71\u4E1C|\u8FBD\u5B81|\u5409\u6797|\u9ED1\u9F99\u6C5F|\u4E0A\u6D77|\u6D59\u6C5F|\u6C5F\u897F|\u798F\u5EFA|\u6E56\u5317|\u6E56\u5357|\u6CB3\u5357|\u5E7F\u4E1C|\u5E7F\u897F|\u6D77\u5357|\u91CD\u5E86|\u56DB\u5DDD|\u8D35\u5DDE|\u4E91\u5357|\u897F\u85CF|\u9655\u897F|\u7518\u8083|\u5B81\u590F|\u9752\u6D77|\u65B0\u7586|\u9999\u6E2F|\u6FB3\u95E8|\u53F0\u6E7E".split("|");

    function l(a, b) {
        function c() {
            "loaded" === h.readyState && setTimeout(function() {
                b && b()
            }, 0)
        }

        var h = f.createElement("script");
        h.addEventListener ? b && h.addEventListener("load", b, !1) : h.attachEvent("onreadystatechange", c);
        k && k.appendChild(h);
        h.src = a
    }

    function getData(srcUrl, callback) {
        var sc = document.createElement("script");
        function orc() {
            if (/(complete)|(loaded)/.test(sc.readyState) && callback) {callback()};
        }
        if (sc.addEventListener) {
            if (callback) {
                sc.addEventListener("load", callback, false);
            }
        } else {
            sc.attachEvent("onreadystatechange", orc);
        }
        (document.head || document.getElementsByTagName("head")[0]).appendChild(sc);
        sc.src = srcUrl;
    }
    function setTopData(tdata) {
        current = tdata;
        $scope.topname = tdata.name;
        $scope.topgender = tdata.sex;
        $scope.topbirth = tdata.birth_time;
        $scope.toplostdate = tdata.lost_time;
        $scope.toplostplace = tdata.lost_place;
        $scope.toplostdesc = tdata.child_feature;
        $scope.toplink = tdata.url;
        $scope.topimg = tdata.child_pic;
        $scope.topid = tdata._id;
        $scope.renderTarget=document.getElementById($scope.renderTarget);
        $scope.renderTarget = $scope.renderTarget?$scope.renderTarget:document.body;
        $scope.renderTarget.innerHTML = template("body", $scope);
        if($scope.renderTarget != document.body){
            with(document.getElementById("mainWrap").style){
                position="relative";
                marginTop=0;
                top="0";
                height="auto";
            }
        
        }
    }

    for (var k =
            f.head || f.getElementsByTagName("head")[0], c = {}, p, r, s, n, t, a = document.getElementsByTagName("script"), b = 0; b < a.length; b++)
        if (-1 < a[b].src.indexOf("/404/search_children.js")) {
            n = a[b].getAttribute("homePageUrl");
            t = a[b].getAttribute("homePageName");
            $scope.renderTarget = a[b].getAttribute("renderTarget");
            break
        }
    $scope.rettext = t || (-1 < location.href.indexOf("qzone.qq.com") ? "\u8fd4\u56de\u6211\u7684\u7a7a\u95f4" : "\u8fd4\u56de\u817e\u8baf\u7f51");
    $scope.retlink = n || (-1 < location.href.indexOf("qzone.qq.com") ?
        "http://qzone.qq.com/" : "http://www.qq.com/");
    var h;
    var city = "鏈煡",province = "鏈煡";
    var caseList=[],optList=[];
    window._Callback = function(a) {
        clearTimeout(h);
        city=cityList[a.data.city_code];
        province=provList[a.data.province_code];
        if(!city) city="鏈煡";
        if(!province) province="鏈煡";
        tmnow = 1E3 * a.data.tm_now;
        getData(_base + 'gy/404/data.js', function() {
            var d=jsondata.data;
            if(d && d.length){
                d.sort(function(){return Math.random()-0.5}); //鎵撲贡娆″簭
                for (var i = 0; i < d.length; i++) {
                    d[i]._id = Math.random();
                    if(!d[i].expire){
                        var lost_place = d[i].lost_place;
                        if (lost_place.indexOf(city)>-1) {
                            caseList.unshift(d[i]); //鍚屽競鐨勫線鍓嶆帓
                        }else if (lost_place.indexOf(province)>-1){
                            caseList.push(d[i]); //鍚岀渷鐨勫線鍚庢帓
                        }else{
                            optList.push(d[i]);//澶栫渷鐨勮繘鍊欓€夊垪琛�
                        }
                    }
                }
                d=caseList.concat(optList)
                tdata = d[0]
                if (!tdata.ext1) {
                    tdata.ext1 = "\u4f46\u6211\u4eec\u53ef\u4ee5\u4e00\u8d77\u5bfb\u627e\u5931\u8e2a\u5b9d\u8d1d";
                }
                $scope.otherdata=d.slice(0,6);
                setTopData(tdata)
            }
        });
    };
    h = setTimeout(function() {
        _Callback({
            "code":0,"subcode":0,"message":"","default":0,"data":{
                "city_code":0,"country_code":0,"province_code":0,"query_ret":0,"tm_now":new Date().getTime()/1E3
            }})}, 2E3);
    getData("//h5.qzone.qq.com/proxy/domain/boss.qzone.qq.com/fcg-bin/fcg_zone_info");
    

    window.share = function(target) {
        var summary = ["\u80cc\u666f\uff1a", current.name, "\uff0c\u6027\u522b\uff1a", current.sex, "\uff0c\u51fa\u751f\u65f6\u95f4\uff1a", current.birth_time, "\uff0c\u5931\u8e2a\u65f6\u95f4\uff1a", current.lost_time, "\uff0c\u7279\u5f81\u63cf\u8ff0\uff1a", current.child_feature].join("");
        if (summary) {
            summary = "#\u5bfb\u627e\u5931\u8e2a\u7684\u5b9d\u8d1d#" + summary;
        }
        var stitle = "\u5931\u8e2a\u7684\u5b9d\u8d1d\u8be6\u60c5";
        var desc = "\u5931\u8e2a\u7684\u5b9d\u8d1d\u8981\u56de\u5bb6\uff0c\u5feb\u6765\u53c2\u4e0e\u7231\u5fc3\u7684\u4f20\u9012\u5427\uff01";
        var encode = encodeURIComponent;
        var opts = {
            "surl": "http://qzone.qq.com/gy/404/" + current.id + "/lostchild.html",
            "site": "QQ\u7a7a\u95f4",
            "summary": summary || "#\u5b9d\u8d1d\u56de\u5bb6#\u817e\u8baf\u5fd7\u613f\u8005\u7528\u6280\u672f\u70b9\u4eae\u516c\u76ca\uff0c\u8ba9\u6211\u4eec\u4e00\u8d77\u5bfb\u627e\u8d70\u5931\u7684\u513f\u7ae5\u5427\uff01",
            "stitle": stitle,
            "pics": current.child_pic,
            "desc": desc,
            "origin_url": current.url
        };
        var surl = opts.surl || "http://www.qq.com/404/",
            summary = opts.summary || "\u8fd9\u4e2a\u662f\u5206\u4eab\u7684\u5185\u5bb9",
            stitle = opts.stitle || "\u8fd9\u4e2a\u662f\u5206\u4eab\u7684\u6807\u9898",
            pics = opts.pics || "http://qzonestyle.gtimg.cn/qzone_v6/act/img/20120422_qzone_7_years/pop_up/icon-pop-seven-years.png",
            site = opts.site || "\u8fd9\u4e2a\u662f\u5206\u4eab\u94fe\u63a5\u7684\u6587\u5b57",
            desc = opts.desc || "\u5931\u8e2a\u7684\u5b9d\u8d1d\u8981\u56de\u5bb6\uff0c\u5feb\u6765\u53c2\u4e0e\u7231\u5fc3\u7684\u4f20\u9012\u5427\uff01",
            origin_url = opts.origin_url || "http://www.qq.com/404/";
        var shareList = {
            weibo: {
                method: function(evt) {
                    var w = "http://v.t.qq.com/share/share.php",
                        q = ["?site=", encode(surl + "#via=share_t_weib"), "&title=", encode(summary), "&pic=", encode(pics), "&url=", encode(surl)].join(""),
                        p = [w, q].join("");
                    openit(p, "weibo", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
                }
            },
            qzone: {
                method: function(evt) {
                    var buff = [],
                        ps = {
                            url: surl + "#via=404-qzoneshare",
                            desc: desc || "\u5931\u8e2a\u7684\u5b9d\u8d1d\u8981\u56de\u5bb6\uff0c\u5feb\u6765\u53c2\u4e0e\u7231\u5fc3\u7684\u4f20\u9012\u5427\uff01",
                            summary: summary,
                            title: stitle,
                            pics: pics,
                            site: site
                        };
                    for (var k in ps) {
                        buff.push(k + "=" + encode(ps[k] || ""));
                    }
                    var w = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + buff.join("&"),
                        q = ["#via=share_t_qzone", "&title=", encode(summary), "&pic=", encode(pics), "&url=", encode(surl)].join(""),
                        p = [w, q].join("");
                    openit(p, "qzone", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
                }
            },
            sina: {
                method: function() {
                    var w = "http://v.t.sina.com.cn/share/share.php",
                        q = ["?url=", encode(surl + "#via=share_x_weib"), "&title=", encode(summary), "&source=", "&sourceUrl=", surl, "&content=utf-8", "&pic=", encode(pics)].join(""),
                        p = [w, q].join("");
                    openit(p, "sina", "toolbar=0,status=0,resizable=1,width=440,height=430");
                }
            },
            kaixin: {
                method: function() {
                    var n = "http://www.kaixin001.com/repaste/bshare.php?rurl=" + encode(surl + "#via=share_kaixin") + "&rcontent=&rtitle=" + encode(summary);
                    openit(n, "kaixin", "toolbar=0,status=0,resizable=1,width=600,height=360");
                }
            },
            renren: {
                method: function() {
                    var n = "http://www.connect.renren.com/share/sharer?title=" + encode(summary) + "&url=" + encode(surl + "#via=share_renren"),
                        p = window.open(n, "rr", "toolbar=0,status=0,resizable=1,width=510,height=300");
                    if (p) {
                        p.focus();
                    }
                }
            },
            weixin: {
                method: function() {
                    var n = "http://qzone.qq.com/gy/404/page/qrcode.html?url=" + encode(origin_url + "#via=share_weixin"),
                        p = window.open(n, "rr", "toolbar=0,status=0,resizable=1,width=620,height=430");
                    if (p) {
                        p.focus();
                    }
                }
            }
        };
        var openit = function(u, n, p) {
            function o() {
                var z;
                if (!(z = window.open(u, n, p))) {
                    location.href = u;
                } else {
                    z.focus();
                }
            }
            o();
        };
        shareList[target] && shareList[target].method();
    };
    window.toThis = function(id) {
        for (var i = 0; i < $scope.otherdata.length; i++) {
            if ($scope.otherdata[i]._id == id) {
                setTopData($scope.otherdata[i]);
                break;
            }
        }
        return false;
    };
    n = document.createElement("meta");
    n.name = "viewport";
    n.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    k.appendChild(n);
    (function() {
        var a = document.createElement("link");
        a.rel = "stylesheet";
        a.type = "text/css";
        a.href = "//qzonestyle.gtimg.cn/qzone/hybrid/app/404/style/404style_min.css";
        k.appendChild(a)
    })();

})(window, document);
! function() {
    function e(a, b) {
        return (/string|function/.test(typeof b) ? q : m)(a, b)
    }

    function f(a, b) {
        return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? f(a.call(a)) : ""), a
    }

    function l(a) {
        return r[a]
    }

    function m(a, b) {
        var c = e.get(a) || k({
            filename: a,
            name: "Render Error",
            message: "Template not found"
        });
        return b ? c(b) : c
    }

    function q(a, b) {
        if ("string" == typeof b) {
            var h = b;
            b = function() {
                return new p(h)
            }
        }
        var e = c[a] = function(c) {
            try {
                return new b(c, a) + ""
            } catch (h) {
                return k(h)()
            }
        };
        return e.prototype = b.prototype =
            n, e.toString = function() {
                return b + ""
            }, e
    }

    function k(a) {
        var b = a.stack || "";
        if (b) b = b.split("\n").slice(0, 2).join("\n");
        else
            for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
        return function() {
            return "object" == typeof console && console.error("{Template Error}\n\n" + b), "{Template Error}"
        }
    }

    var c = e.cache = {},
        p = this.String,
        r = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        },
        s = Array.isArray || function(a) {
            return "[object Array]" === {}.toString.call(a)
        },
        n = e.utils = {
            $helpers: {},
            $include: function(a, b, c) {
                var e = a,
                    f = /(\/)[^/]+\1\.\.\1/;
                c = ("./" + c).replace(/[^/]+$/, "") + e;
                for (c = c.replace(/\/\.\//g, "/"); c.match(f);) c = c.replace(f, "/");
                return a = c, m(a, b)
            },
            $string: f,
            $escape: function(a) {
                return f(a).replace(/&(?![\w#]+;)|[<>"']/g, l)
            },
            $each: function(a, b) {
                if (s(a))
                    for (var c = 0, e = a.length; e > c; c++) b.call(a, a[c], c, a);
                else
                    for (c in a) b.call(a, a[c], c)
            }
        },
        t = e.helpers = n.$helpers;
    e.get = function(a) {
        return c[a.replace(/^\.\//, "")]
    };
    e.helper = function(a, b) {
        t[a] = b
    };
    "function" == typeof define ? define(function() {
            return e
        }) : "undefined" != typeof exports ? module.exports =
        e : this.template = e;
    e("body", function(a) {
        var b = (this.$helpers, this.$escape),
            c = a.retlink,
            e = a.rettext,
            f = a.topid,
            k = a.topimg,
            l = a.topname,
            g = a.topgender,
            m = a.topbirth,
            n = a.toplostdate,
            q = a.toplostplace,
            r = a.toplostdesc,
            s = a.toplink,
            t = this.$each,
            u = a.otherdata,
            d = (a.otheritem, a.index, "");
        return d += '<div class="mod_404"> <div class="wrapper" id="mainWrap"> <div class="mod_hd"> <h1 class="title"><span class="title_inner">404\uff0c\u60a8\u8bbf\u95ee\u7684\u9875\u9762\u627e\u4e0d\u56de\u6765\u4e86\uff0c\u4f46\u6211\u4eec\u53ef\u4ee5\u4e00\u8d77\u5e2e\u4ed6\u4eec\u56de\u5bb6\uff01</span></h1> <div class="desc"><a href="',
            d += b(c), d += '" class="desc_link">', d += b(e), d += '</a></div> </div> <div class="mod_bd"> <div class="child_box"> <div class="mod_404_child child_in" data-id="', d += b(f), d += '" id="top_', d += b(f), d += '"> <div class="child_main cf"> <div class="child_avatar"><img src="', d += b(k).replace(/http:\/\/qzone\.qq\.com\//g, "//imgcache.qq.com/qzone/v6/portal/"), d += '" onload="imagezoom(this, 160, 216);" style="opacity:0"></div> <div class="child_info"> <div class="info_name"> <h2><span class="name_inner">', d += b(l), d += '</span><span class="info_sex">(', d += b(g), d += ')</span></h2> </div> <div class="info_item info_birth"><span class="info_lbl">\u51fa\u751f\u65e5\u671f\uff1a</span><span class="item_inner">',
            d += b(m), d += '</span></div> <div class="info_item info_time"><span class="info_lbl">\u5931\u8e2a\u65f6\u95f4\uff1a</span><span class="item_inner">', d += b(n), d += '</span></div> <div class="info_item info_address"><span class="info_lbl">\u5931\u8e2a\u5730\u70b9\uff1a</span><span class="item_inner">', d += b(q), d += '</span></div> <div class="info_item info_desc"><span class="info_lbl">\u5931\u8e2a\u4eba\u7279\u5f81\u63cf\u8ff0\uff1a</span><span class="item_inner">', d += b(r), d += '</span></div> <a href="', d += b(s),
            d += '" class="link_view" title="\u67e5\u770b\u8be6\u60c5"><span class="link_inner">\u67e5\u770b\u8be6\u60c5</span></a> </div> </div> <div class="child_bottom cf"> <div class="bottom_logo"> <ul class="logo_list"> <li><a href="http://e.t.qq.com/Tencent-Volunteers" title="\u817e\u8baf\u5fd7\u613f\u8005"><img src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/style/image/logo_tencentvolunteers.png"></a></li> <li><a href="http://bbs.baobeihuijia.com/forum.php" title="\u5b9d\u8d1d\u56de\u5bb6"><img src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/style/image/logo_baobeihuijia.png"></a></li> </ul> </div> <div class="bottom_right"> <div class="mod_share" onmouseover="this.className += \' mod_share_hover\';" onmouseout="this.className = this.className.replace(\' mod_share_hover\',\'\')"> <span class="share_inner">\u5206\u4eab</span> <ul class="share_list"> <li><a href="javascript:void(0);" class="share_link" onclick="share(\'weibo\');return false;" title="\u817e\u8baf\u5fae\u535a"><span class="link_inner">\u817e\u8baf\u5fae\u535a</span><i class="ico_tencentweibo"></i></a></li> <li><a href="javascript:void(0);" class="share_link" onclick="share(\'qzone\');return false;" title="QQ\u7a7a\u95f4"><span class="link_inner">QQ\u7a7a\u95f4</span><i class="ico_qzone"></i></a></li> <li><a href="javascript:void(0);" class="share_link" onclick="share(\'sina\');return false;" title="\u65b0\u6d6a\u5fae\u535a"><span class="link_inner">\u65b0\u6d6a\u5fae\u535a</span><i class="ico_sinaweibo"></i></a></li> <li><a href="javascript:void(0);" class="share_link" onclick="share(\'weixin\');return false;" title="\u5fae\u4fe1"><span class="link_inner">\u5fae\u4fe1</span><i class="ico_weixin"></i></a></li> </ul> <span style="clear: both;"></span> </div> </div> </div> </div> <i class="ico_corner"></i> </div> </div> <div class="mod_fd"> <div class="mod_404_children"> <ul class="children_list"> ',
            t(u, function(a) {
                d += ' <li class="';
                d += b(f == a._id ? "current" : "");
                d += '"><a href="javascript:;" onclick="toThis(\'';
                d += b(a._id);
                d += '\');" title="';
                d += b(a.name);
                d += '" ><img src="';
                d += b(a.child_pic).replace(/http:\/\/qzone\.qq\.com\//g, "//imgcache.qq.com/qzone/v6/portal/");
                d += '"></a></li> '
            }), d += " </ul> </div> </div> </div> </div>", new p(d)
    })
}();