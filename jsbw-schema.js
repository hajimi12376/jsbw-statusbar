import { registerMvuSchema as register } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

// 《江山北望》变量结构 Schema（照原卡《残明余烬》registerMvuSchema 机制）
// 用 z.looseObject 宽松校验：字段对不上不报错，未定义字段保留原值。
// 每个数值字段按 range clamp，字符串给默认值，枚举限定取值。

const zz = z;

// 常用转换器
const num0100 = zz.coerce.number().transform(v => _.clamp(v, 0, 100));          // 0~100
const num010 = zz.coerce.number().transform(v => Math.max(0, Math.round(v)));    // 非负整数
const numNeg1000 = zz.coerce.number().transform(v => _.clamp(v, -1000, 1000));   // 声望
const numNeg100 = zz.coerce.number().transform(v => _.clamp(v, -100, 100));      // 好感度
const num50500 = zz.coerce.number().transform(v => _.clamp(v, 50, 500));         // 价格指数

// 角色关系对象（人际网络各分类通用）
const relObj = zz.object({
  身份: zz.string().prefault(''),
  好感度: numNeg100.prefault(0)
}).prefault({ 身份: '', 好感度: 0 });

const schema = zz.object({
  世界运转: zz.object({
    _开场标识: zz.string().prefault(''),
    当前日期: zz.string().prefault('承熙元年三月初一'),
    公元年份: zz.coerce.number().prefault(1),
    十二时辰: zz.object({
      时辰: zz.enum(['子时','丑时','寅时','卯时','辰时','巳时','午时','未时','申时','酉时','戌时','亥时']).prefault('卯时'),
      刻: zz.enum(['初刻','一刻','二刻','三刻','四刻','五刻','六刻','七刻']).prefault('三刻')
    }).prefault({}),
    二十四时: zz.object({
      小时: zz.coerce.number().transform(v => _.clamp(v, 0, 23)).prefault(8),
      分钟: zz.coerce.number().transform(v => _.clamp(v, 0, 59)).prefault(0)
    }).prefault({}),
    当前地点: zz.string().prefault('宣京-晋王府-书房'),
    天气: zz.string().prefault('晴'),
    场景: zz.enum(['SFW','NSFW','WAR']).prefault('SFW'),
    世界运转天数: num010.prefault(0)
  }).prefault({}),

  主角: zz.object({
    官职: zz.string().prefault('宣国二皇子，晋王'),
    声望: numNeg1000.prefault(30),
    声望阶段: zz.enum(['遗臭万年','声名狼藉','众矢之的','毁誉参半','默默无闻','声名鹊起','威震一方','天下景仰','名垂千古']).prefault('默默无闻'),
    五维: zz.object({
      生命: num0100.prefault(90),
      武力: num0100.prefault(40),
      统率: num0100.prefault(45),
      智谋: num0100.prefault(60),
      政治: num0100.prefault(55)
    }).prefault({}),
    私库: zz.object({
      金银铜: zz.object({
        黄金: num010.prefault(20),
        白银: zz.coerce.number().prefault(800),
        铜钱: num010.prefault(50000)
      }).prefault({}),
      重要物品: zz.record(zz.string(), zz.object({
        简介: zz.string().prefault(''),
        数量: num010.prefault(1)
      }).prefault({ 简介: '', 数量: 1 })).prefault({})
    }).prefault({})
  }).prefault({}),

  人际网络: zz.object({
    在场角色: zz.array(zz.string()).transform(v => [...new Set(v.map(s => s.trim()).filter(Boolean))]).prefault([]),
    上司: zz.record(zz.string(), relObj).prefault({}),
    故友与同僚: zz.record(zz.string(), relObj).prefault({}),
    下属与幕僚: zz.record(zz.string(), zz.object({
      身份: zz.string().prefault(''),
      好感度: numNeg100.prefault(0),
      忠心: num0100.prefault(50)
    }).prefault({ 身份: '', 好感度: 0, 忠心: 50 })).prefault({}),
    三教九流: zz.record(zz.string(), relObj).prefault({}),
    仇敌: zz.record(zz.string(), zz.object({
      身份: zz.string().prefault(''),
      仇恨度: num0100.prefault(0)
    }).prefault({ 身份: '', 仇恨度: 0 })).prefault({}),
    亲属: zz.record(zz.string(), relObj).prefault({}),
    私帷: zz.record(zz.string(), zz.object({
      身份: zz.string().prefault(''),
      关系: zz.string().prefault('红颜'),
      好感度: numNeg100.prefault(50),
      忠心: num0100.prefault(50),
      着装: zz.string().prefault(''),
      生育: zz.object({
        是否处女: zz.boolean().prefault(true),
        同房次数: num010.prefault(0),
        周期: num010.prefault(6),
        时期: zz.enum(['安全期','危险期']).prefault('安全期'),
        状态: zz.enum(['未孕','已孕']).prefault('未孕'),
        末次同房: zz.object({
          日期: zz.string().prefault(''),
          周期日: num010.prefault(0),
          判定概率: num010.prefault(0)
        }).prefault({}),
        预产期: zz.string().prefault(''),
        _预产天数: num010.prefault(0),
        _产后天数: num010.prefault(0)
      }).prefault({})
    }).prefault({})).prefault({})
  }).prefault({}),

  军事: zz.object({
    各营: zz.record(zz.string(), zz.object({
      兵种: zz.string().prefault('步卒'),
      人数: num010.prefault(0),
      士气: num0100.prefault(50),
      训练: num0100.prefault(50),
      后勤: num0100.prefault(50),
      装备: zz.object({
        等级: zz.string().prefault('普通'),
        齐备率: num0100.prefault(50),
        完好率: num0100.prefault(50)
      }).prefault({})
    }).prefault({})).prefault({}),
    将领: zz.record(zz.string(), zz.object({
      职位: zz.string().prefault(''),
      兵力: num010.prefault(0),
      统率: num0100.prefault(50),
      武力: num0100.prefault(50),
      智谋: num0100.prefault(50),
      政治: num0100.prefault(50),
      威望: num0100.prefault(50)
    }).prefault({})).prefault({}),
    战斗记录: zz.record(zz.string(), zz.object({
      日期: zz.string().prefault(''),
      地点: zz.string().prefault(''),
      结果: zz.string().prefault(''),
      伤亡: zz.string().prefault('')
    }).prefault({})).prefault({}),
    军令: zz.object({}).prefault({}),
    军令记录: zz.array(zz.string()).prefault([])
  }).prefault({}),

  经济: zz.object({
    资产: zz.record(zz.string(), zz.object({
      说明: zz.string().prefault(''),
      月入: zz.coerce.number().prefault(0)
    }).prefault({})).prefault({}),
    仓储: zz.record(zz.string(), zz.object({
      数量: num010.prefault(0),
      单位: zz.string().prefault('')
    }).prefault({})).prefault({}),
    市场: zz.object({
      价格指数: zz.object({
        粮食: num50500.prefault(100),
        军需: num50500.prefault(100),
        常用物资: num50500.prefault(100)
      }).prefault({}),
      汇率: zz.object({
        一两黄金兑白银: zz.coerce.number().prefault(6),
        一两白银兑铜钱: zz.coerce.number().prefault(1200)
      }).prefault({}),
      市况: zz.string().prefault('平稳'),
      _库存月份: zz.string().prefault(''),
      _剩余库存: zz.object({}).prefault({})
    }).prefault({})
  }).prefault({}),

  科技: zz.record(zz.string(), zz.object({
    进度: zz.enum(['未开始','试验中','小规模试点','已推广']).prefault('未开始'),
    现状: zz.string().prefault('')
  }).prefault({})).prefault({}),

  个人史记: zz.object({
    大事记: zz.record(zz.string(), zz.object({
      日期: zz.string().prefault(''),
      地点: zz.string().prefault(''),
      类型: zz.enum(['军政','经济','人事','外交','战役','建设','技术','家族','其他']).prefault('其他'),
      事迹: zz.string().prefault(''),
      影响: zz.string().prefault('')
    }).prefault({})).prefault({})
  }).prefault({}),

  天下地图: zz.object({
    地区态势: zz.record(zz.string(), zz.object({
      名义归属: zz.string().prefault(''),
      实控势力: zz.string().prefault(''),
      实控阵营: zz.string().prefault(''),
      争夺状态: zz.enum(['稳定','动荡','争夺中']).prefault('稳定'),
      主要势力: zz.record(zz.string(), zz.object({
        影响力: num0100.prefault(50),
        军事存在: zz.string().prefault(''),
        描述: zz.string().prefault('')
      }).prefault({})).prefault({}),
      军事态势: zz.string().prefault(''),
      经济态势: zz.string().prefault(''),
      最近大事: zz.string().prefault('')
    }).prefault({})).prefault({}),
    世局线: zz.object({}).prefault({})
  }).prefault({}),

  时局与任务: zz.object({
    势力关系: zz.record(zz.string(), zz.object({
      好感度: numNeg100.prefault(0),
      状态: zz.string().prefault('观望'),
      关系摘要: zz.string().prefault(''),
      经济: zz.object({
        财政状况: zz.string().prefault('未知'),
        粮草状态: zz.string().prefault('未知')
      }).prefault({}),
      军事: zz.object({
        总兵力: num010.prefault(0),
        主力兵种: zz.string().prefault('未知'),
        下属将领: zz.object({}).prefault({}),
        军队: zz.object({}).prefault({})
      }).prefault({})
    }).prefault({})).prefault({}),
    未决事项: zz.record(zz.string(), zz.object({
      状态: zz.enum(['待处理','推进中','已完成','已搁置']).prefault('待处理'),
      概要: zz.string().prefault(''),
      现状: zz.string().prefault(''),
      提醒: zz.string().prefault('')
    }).prefault({})).prefault({})
  }).prefault({}),

  风月阁: zz.object({
    同房点数: num010.prefault(0),
    器物: zz.record(zz.string(), zz.object({
      简介: zz.string().prefault(''),
      数量: num010.prefault(1)
    }).prefault({ 简介: '', 数量: 1 })).prefault({})
  }).prefault({})
});

$(function () {
  register(schema);
});

export { schema as Schema };
