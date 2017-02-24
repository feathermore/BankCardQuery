;(function ($) {
    var Query = function (el, options) {
        this.container = $(el);
        this.defaults = {
            tipsWrap: '',
            numberList : [
                {
                    bankName:'中国建设银行',
                    pattern:/^(436742|436745|622280|622700)/g
                },
                {
                    bankName:'交通银行',
                    pattern:/^(458123|521899|622260|622250|622251|622258|622259)/g
                },
                {
                    bankName:'上海银行',
                    pattern:/^(402674|622892)/g
                },
                {
                    bankName:'中国邮政储蓄银行',
                    pattern:/^(622188|622150|622151|622199|955100)/g
                },
                {
                    bankName:'北京银行',
                    pattern:/^(602969)/g
                },
                {
                    bankName:'中国银行',
                    pattern:/^(622760|622751|622752|622753|622754|622755|622756|622757|622758|622759|622760|622761|622762|622763|409666|438088|601382)/g
                },
                {
                    bankName:'中国工商银行',
                    pattern:/^(427010|427018|427019|427020|427028|427029|427030|427038|427039|427062|427064|438125|438126|402791|530990|622230|622235|622210|622215|622200|622202|622203|622208|955880|370246|370247)/g
                },
                {
                    bankName:'广发银行',
                    pattern:/^(622568|520152|520382|911121|548844)/g
                },
                {
                    bankName:'宁波银行',
                    pattern:/^(512431|520194|622318|622778|622282)/g
                },
                {
                    bankName:'中国民生银行',
                    pattern:/^(512466|415599|421870|407405|517636|528948 |552288|556610|622600|622601|622602|622603|421869|421871|628258)/g
                },
                {
                    bankName:'浦发银行',
                    pattern:/^(418152|456418|622521|404738|404739|498451|622517|622518|515672|517650|525998|356850|356851|356852)/g
                },
                {
                    bankName:'深圳发展银行',
                    pattern:/^(435744|622526|435745|998801|998802|622525|622538)/g
                },
                {
                    bankName:'中国光大银行',
                    pattern:/^(406254|622655|622650|622658|356839|486497|481699|543159|425862|406252|356837|356838|356840|622161|628201|628202)/g
                },
                {
                    bankName:'平安银行',
                    pattern:/^(622155|622156|528020|526855)/g
                },
                {
                    bankName:'华夏银行',
                    pattern:/^(539867|528709|523959|622637|622636|528708|539868)/g
                },
                {
                    bankName:'招商银行',
                    pattern:/^(518710|518718|622588|622575|545947|521302|439229|552534|622577|622579|439227|479229|356890|356889|356885|439188|545948|545623|552580|552581|552582|552583|552584|552585|552586|552588|552589|645621|545619|356886|622578|622576|622581|439228|439225|439226|628262|628362)/g
                },
                {
                    bankName:'中信银行',
                    pattern:/^(376968|376966|622918|622916|518212|622690|520108|376969|622919|556617|622680|403391|558916|514906|400360|433669|433667|433666|404173|404172|404159|404158|403393|403392|622689|622688|433668|404157|404171|404174|628209|628208|628206)/g
                },
                {
                    bankName:'中国农业银行',
                    pattern:/^(552599|404119|404121|519412|403361|558730|520083|520082|519413|404120|622922|404118|404117|622836|622837|622848)/g
                },
                {
                    bankName:'兴业银行',
                    pattern:/^(451289|622902|622901|527414|524070|486493|486494|451290|523036|486861|622922 )/g
                }
            ]
        };

        this.options = $.extend(this.defaults, options);
        this.init();
    };


    Query.prototype = {
        cardFormBank: function (num){
            var numberList = this.options.numberList;
            for (var i = 0, len = numberList.length; i < len; i++) {
                if (numberList[i].pattern.test(num)) {
                    return numberList[i];
                }
            }
            return false
        },
        checkCardNum: function (num) {
            var bankDetail = this.cardFormBank(parseInt(num.toString().substring(0, 6)));
            if (!bankDetail){
                return "其他银行"
            } else {
                return bankDetail.bankName
            }
        },
        init: function () {
            var $this = this;

            this.container.change(function (e) {
                var value = $(this).val();
                if (!isNaN(value) && value.length >= 16 && value.length <= 19) {
                    $($this.options.tipsWrap).html($this.checkCardNum(value))
                } else {
                    $($this.options.tipsWrap).html('输入有误')
                }
            })

        }
    };
    $.fn.banQuery = function (options) {
        var me = this;
        return this.each(function() {
            var instance = me.data('banQuery');
            if(!instance){
                me.data('banQuery',(instance = new Query(this, options)));
            }
        });
    };
})(jQuery);
