// index.js
const diagnosticData = {
  "太阳": {
    "1": {
      text: "太阳中风证：发热、汗出、恶风、脉缓。",
      formula: "桂枝汤",
      composition: "桂枝9g、芍药9g、生姜9g、大枣12枚、炙甘草6g",
      usage: "水煎服，每日1剂，分2-3次温服。"
    },
    "2": {
      text: "太阳伤寒证：发热、无汗、恶寒、身疼、脉紧。",
      formula: "麻黄汤",
      composition: "麻黄9g、桂枝9g、杏仁9g、炙甘草6g",
      usage: "水煎服，每日1剂，分2-3次温服。"
    }
  },
  "阳明": {
    "1": {
      text: "阳明腑实证：发热、大便秘结、腹满痛、口渴、脉实有力。",
      formula: "大承气汤",
      composition: "大黄12g、厚朴12g、枳实9g、芒硝9g",
      usage: "水煎服，分2次温服。"
    },
    "2": {
      text: "阳明胃热证：口渴、烦热、汗出、脉大。",
      formula: "白虎汤",
      composition: "知母30g、石膏30g、甘草6g、粳米30g",
      usage: "水煎服，每日1剂，分2-3次温服。"
    }
  },
  "少阳": {
    "1": {
      text: "少阳证：往来寒热、胸胁苦满、口苦、咽干、目眩、脉弦。",
      formula: "小柴胡汤",
      composition: "柴胡24g、黄芩9g、人参9g、甘草6g、半夏9g、生姜9g、大枣12枚",
      usage: "水煎服，每日1剂，分2-3次温服。"
    }
  }
}

Page({
  data: {
    // 主症状列表 - 按证候分组
    mainSymptoms: [
      // 太阳证
      '发热无汗',
      '发热恶寒',
      '头项强痛',
      // 阳明证
      '发热口渴',
      '大便秘结',
      '腹满痛',
      // 少阳证
      '往来寒热',
      '胸胁苦满',
      '口苦咽干'
    ],
    // 次症状列表
    secondarySymptoms: [
      // 太阳证
      '恶寒身疼',
      '头痛项强',
      '无汗',
      // 阳明证
      '烦热多汗',
      '腹满便秘',
      '口渴烦躁',
      // 少阳证
      '目眩',
      '耳聋',
      '心烦'
    ],
    // 脉象列表
    pulseConditions: [
      // 太阳证
      '浮紧脉',
      '浮缓脉',
      '浮数脉',
      // 阳明证
      '洪大脉',
      '实有力脉',
      '滑数脉',
      // 少阳证
      '弦脉',
      '弦数脉',
      '弦细脉'
    ],
    // 舌象列表
    tongueConditions: [
      // 太阳证
      '舌淡苔白',
      '舌淡红苔白',
      '舌质红',
      // 阳明证
      '舌红苔黄',
      '舌红苔厚腻',
      '舌红苔黄燥',
      // 少阳证
      '舌红苔薄白',
      '舌红苔薄黄',
      '舌淡红'
    ],
    mainSymptomIndex: 0,
    secondarySymptomIndex: 0,
    pulseIndex: 0,
    tongueIndex: 0,
    diagnosisResult: '',
    showFormula: false,
    showNotice: true,
    diagnosticData: diagnosticData,
    formulaName: '',
    formulaComposition: '',
    formulaUsage: ''
  },

  onLoad: function() {
    // 初始化时只设置必要的数据
    wx.showLoading({
      title: '加载中...'
    })
    
    setTimeout(() => {
      this.setData({
        showNotice: true
      })
      wx.hideLoading()
    }, 500)
  },

  onReady: function() {
    // 页面渲染完成
  },

  onShow: function() {
    // 页面显示
  },

  bindMainSymptomChange: function(e) {
    this.setData({
      mainSymptomIndex: e.detail.value
    })
  },

  bindSecondarySymptomChange: function(e) {
    this.setData({
      secondarySymptomIndex: e.detail.value
    })
  },

  bindPulseChange: function(e) {
    this.setData({
      pulseIndex: e.detail.value
    })
  },

  bindTongueChange: function(e) {
    this.setData({
      tongueIndex: e.detail.value
    })
  },

  getDiagnosis: function(mainSymptom, secondarySymptom, pulse, tongue) {
    // 太阳证判断
    if (this.isTaiYangSymptoms(mainSymptom, secondarySymptom, pulse, tongue)) {
      return {
        text: diagnosticData['太阳']['2'].text,
        syndrome: '太阳证',
        formula: diagnosticData['太阳']['2'].formula,
        composition: diagnosticData['太阳']['2'].composition,
        usage: diagnosticData['太阳']['2'].usage
      }
    }
    
    // 阳明证判断
    if (this.isYangMingSymptoms(mainSymptom, secondarySymptom, pulse, tongue)) {
      return {
        text: diagnosticData['阳明']['1'].text,
        syndrome: '阳明证',
        formula: diagnosticData['阳明']['1'].formula,
        composition: diagnosticData['阳明']['1'].composition,
        usage: diagnosticData['阳明']['1'].usage
      }
    }

    // 少阳证判断
    if (this.isShaoYangSymptoms(mainSymptom, secondarySymptom, pulse, tongue)) {
      return {
        text: diagnosticData['少阳']['1'].text,
        syndrome: '少阳证',
        formula: diagnosticData['少阳']['1'].formula,
        composition: diagnosticData['少阳']['1'].composition,
        usage: diagnosticData['少阳']['1'].usage
      }
    }

    return {
      text: '未能得出明确诊断，建议就医。\n\n可能的原因：\n1. 症状组合不典型\n2. 需要进一步诊断\n3. 可能属于其他证候',
      syndrome: '未明确证候',
      formula: '',
      composition: '',
      usage: ''
    }
  },

  // 太阳证症状判断
  isTaiYangSymptoms: function(mainSymptom, secondarySymptom, pulse, tongue) {
    const mainSymptoms = ['发热无汗', '发热恶寒', '头项强痛']
    const secondarySymptoms = ['恶寒身疼', '头痛项强', '无汗']
    const pulses = ['浮紧脉', '浮缓脉', '浮数脉']
    const tongues = ['舌淡苔白', '舌淡红苔白', '舌质红']

    return mainSymptoms.indexOf(mainSymptom) !== -1 &&
           secondarySymptoms.indexOf(secondarySymptom) !== -1 &&
           pulses.indexOf(pulse) !== -1 &&
           tongues.indexOf(tongue) !== -1
  },

  // 阳明证症状判断
  isYangMingSymptoms: function(mainSymptom, secondarySymptom, pulse, tongue) {
    const mainSymptoms = ['发热口渴', '大便秘结', '腹满痛']
    const secondarySymptoms = ['烦热多汗', '腹满便秘', '口渴烦躁']
    const pulses = ['洪大脉', '实有力脉', '滑数脉']
    const tongues = ['舌红苔黄', '舌红苔厚腻', '舌红苔黄燥']

    return mainSymptoms.indexOf(mainSymptom) !== -1 &&
           secondarySymptoms.indexOf(secondarySymptom) !== -1 &&
           pulses.indexOf(pulse) !== -1 &&
           tongues.indexOf(tongue) !== -1
  },

  // 少阳证症状判断
  isShaoYangSymptoms: function(mainSymptom, secondarySymptom, pulse, tongue) {
    const mainSymptoms = ['往来寒热', '胸胁苦满', '口苦咽干']
    const secondarySymptoms = ['目眩', '耳聋', '心烦']
    const pulses = ['弦脉', '弦数脉', '弦细脉']
    const tongues = ['舌红苔薄白', '舌红苔薄黄', '舌淡红']

    return mainSymptoms.indexOf(mainSymptom) !== -1 &&
           secondarySymptoms.indexOf(secondarySymptom) !== -1 &&
           pulses.indexOf(pulse) !== -1 &&
           tongues.indexOf(tongue) !== -1
  },

  submitDiagnosis: function() {
    const mainSymptom = this.data.mainSymptoms[this.data.mainSymptomIndex]
    const secondarySymptom = this.data.secondarySymptoms[this.data.secondarySymptomIndex]
    const pulse = this.data.pulseConditions[this.data.pulseIndex]
    const tongue = this.data.tongueConditions[this.data.tongueIndex]

    const result = this.getDiagnosis(mainSymptom, secondarySymptom, pulse, tongue)
    
    this.setData({
      diagnosisResult: result.syndrome + '\n\n' + result.text,
      showFormula: result.formula !== '',
      formulaName: result.formula,
      formulaComposition: result.composition,
      formulaUsage: result.usage
    })
  }
})
