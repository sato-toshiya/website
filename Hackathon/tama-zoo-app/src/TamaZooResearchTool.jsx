import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Camera, FileDown, Mail, Share2, Star, Eye, PenTool } from 'lucide-react';

const TamaZooResearchTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    grade: '',
    category: '',
    difficulty: '',
    email: '',
    selectedTheme: '',
    selectionReason: '',
    observationPoints: [], // 観察ポイントごとのデータを格納
    reflection: ''
  });

  const [proposedThemes, setProposedThemes] = useState([]);

  const steps = [
    { id: 'questions', title: '質問', icon: '?' },
    { id: 'themes', title: 'テーマ提案', icon: '💡' },
    { id: 'selection', title: 'テーマ選択', icon: '✓' },
    { id: 'research', title: '研究中', icon: '🔍' },
    { id: 'reflection', title: '感想', icon: '💭' },
    { id: 'preview', title: 'プレビュー', icon: '📄' }
  ];

  const categories = [
    { id: 'mammal', name: '哺乳類', subcategories: ['アジアゾウ', 'キリン', 'コアラ', 'チンパンジー', 'オオカミ', 'レッサーパンダ'] },
    { id: 'bird', name: '鳥類', subcategories: ['ペンギン', 'フラミンゴ', 'ワシ・タカ', 'クジャク'] },
    { id: 'insect', name: '昆虫', subcategories: ['チョウ', 'ハキリアリ', 'グローワーム'] },
    { id: 'other', name: 'その他', subcategories: ['動物比較研究', '環境調査', '行動観察'] }
  ];

  const sampleThemes = {
    '1': proposedThemes.filter(theme => typeof theme === 'object').slice(0, 3).map(theme => theme?.title || 'サンプルテーマ'),
    '2': proposedThemes.filter(theme => typeof theme === 'object').slice(0, 3).map(theme => theme?.title || 'サンプルテーマ'),  
    '3': proposedThemes.filter(theme => typeof theme === 'object').slice(0, 3).map(theme => theme?.title || 'サンプルテーマ')
  };

  const observationThemes = {
    mammal: {
      easy: [
        {
          id: 1,
          title: 'コアラの1日の過ごし方',
          question: '1日のうち、寝ている時間と起きている時間はどのくらいか？',
          guide: 'コアラは1日20時間も眠ると言われています。実際に観察して確かめてみましょう。',
          points: [
            {
              id: 1,
              title: '睡眠時間の観察',
              question: '1日のうち、寝ている時間と起きている時間はどのくらいか',
              guide: '開園から閉園まで、30分おきに活動を記録してみましょう（睡眠、食事、移動など）'
            },
            {
              id: 2,
              title: 'ユーカリの食べ方',
              question: 'ユーカリの葉をどのように選んで食べているか',
              guide: 'どんな葉を選んでいるか、食べ方に特徴はあるかを観察しましょう'
            },
            {
              id: 3,
              title: '木の上での生活',
              question: '木の上での移動方法と体のバランスの取り方',
              guide: '木から木への移動や、枝での休み方を詳しく見てみましょう'
            },
            {
              id: 4,
              title: '警戒行動',
              question: '耳や鼻の動きに注目し、周りを警戒しているか観察',
              guide: '人の声や他の音に対してどんな反応を示すかを記録しましょう'
            }
          ],
          schedule: [
            '開園直後〜閉園まで、30分おきに活動を記録',
            '13:30 ユーカリ交換の時間 - 新しい葉への反応を観察'
          ]
        },
        {
          id: 2,
          title: 'レッサーパンダのしっぽの役割',
          question: '長くて太いしっぽをどう使っているか？',
          guide: 'しっぽがバランス取りや防寒にどう役立っているかを観察してみましょう。',
          points: [
            {
              id: 1,
              title: 'バランス機能',
              question: '木登りや竹の上を歩くときのしっぽの動き',
              guide: 'アスレチックでの木登りの様子を観察し、しっぽがどう動いているかを記録しましょう'
            },
            {
              id: 2,
              title: '食事中の様子',
              question: '食事中（リンゴなど）や休息中のしっぽの位置',
              guide: 'エサを食べているときにしっぽをどこに置いているか観察しましょう'
            },
            {
              id: 3,
              title: '防寒機能',
              question: '休息・昼寝時のしっぽの使い方',
              guide: '丸まって寝るときにしっぽを枕や毛布代わりに使っているかを見てみましょう'
            },
            {
              id: 4,
              title: 'コミュニケーション',
              question: '他のレッサーパンダとの関わりでしっぽを使うか',
              guide: '仲間同士でしっぽを使った交流があるかを観察しましょう'
            }
          ],
          schedule: [
            '11:30 食事の時間',
            '13:30 活動時間',
            '15:00 休息・昼寝',
            '16:00 まとめ'
          ]
        }
      ],
      normal: [
        {
          id: 3,
          title: 'アジアゾウの鼻の器用さ',
          question: '鼻でどんなものを掴んでいるか？',
          guide: 'ゾウの鼻は5万個以上の筋肉でできています。その器用さを詳しく観察してみましょう。',
          points: [
            {
              id: 1,
              title: 'エサを掴む技術',
              question: '鼻でどんなものを掴んでいるか（エサの種類、大きさ、形）',
              guide: 'エサの種類によって掴み方が違うかを観察しましょう'
            },
            {
              id: 2,
              title: '水の使い方',
              question: '鼻を使って水を飲む、体に砂や水をかける様子',
              guide: '水浴びタイムでの鼻の使い方に注目しましょう'
            },
            {
              id: 3,
              title: '鼻の形と動き',
              question: '鼻の先の形や動かし方の細かさ',
              guide: '鼻の先端部分の器用な動きを詳しく観察してみましょう'
            },
            {
              id: 4,
              title: 'コミュニケーション',
              question: '他のゾウとのコミュニケーションで鼻をどう使っているか',
              guide: 'ゾウ同士が鼻で触れ合う様子や挨拶の仕方を観察しましょう'
            }
          ],
          schedule: [
            '10:00 エサの時間',
            '11:30 水浴びタイム',
            '14:00 自由時間',
            '15:30 まとめ'
          ]
        },
        {
          id: 4,
          title: 'キリンの体のつくりと食べ方',
          question: '長い首をどうやって動かしているか？',
          guide: 'キリンの首の骨は人間と同じ7個です。どうやって長い首を自在に動かすのでしょうか。',
          points: [
            {
              id: 1,
              title: '首の動かし方',
              question: '長い首をどうやって動かしているか（水を飲むとき、高い葉を食べるとき）',
              guide: '水を飲むときの首の曲げ方と、高い葉を食べるときの伸ばし方を比較しましょう'
            },
            {
              id: 2,
              title: '舌の使い方',
              question: '長い舌を使ってどのように葉を巻き取って食べるか',
              guide: '50cmもある長い舌をどのように器用に使っているかを観察しましょう'
            },
            {
              id: 3,
              title: '個体の違い',
              question: '体の網目模様は、一頭一頭違うか',
              guide: '人間の指紋のように、キリンの模様も個体によって違うかを確認しましょう'
            },
            {
              id: 4,
              title: '歩き方の特徴',
              question: '歩き方や走り方の特徴',
              guide: '長い足をどのように動かして歩いているかを詳しく観察しましょう'
            }
          ],
          schedule: [
            '11:00 エサの時間',
            '12:30 水飲み場での様子',
            '14:30 サバンナでの様子',
            '16:00 まとめ'
          ]
        }
      ],
      hard: [
        {
          id: 5,
          title: 'チンパンジーのコミュニケーション',
          question: '仲間同士でどんな声を出しているか？',
          guide: 'チンパンジーは複雑な社会を築いています。その中でのコミュニケーション方法を詳しく研究しましょう。',
          points: [
            {
              id: 1,
              title: '音声コミュニケーション',
              question: '仲間同士でどんな声を出しているか（種類と状況を記録）',
              guide: '鳴き声の種類と、その時の状況を詳しく記録してみましょう'
            },
            {
              id: 2,
              title: '表情とジェスチャー',
              question: '表情（笑う、怒るなど）やジェスチャーの変化',
              guide: '人間に似た表情やジェスチャーがどんな意味を持つか考えてみましょう'
            },
            {
              id: 3,
              title: 'グルーミング行動',
              question: '毛づくろい（グルーミング）は誰と誰がしているか',
              guide: 'グルーミングの組み合わせから、チンパンジーの社会関係を読み取ってみましょう'
            },
            {
              id: 4,
              title: '道具使用',
              question: '道具（枝や石など）を使って仲間とやりとりするか',
              guide: '道具を使った遊びや、道具を使って仲間とコミュニケーションを取るかを観察しましょう'
            }
          ],
          schedule: [
            '10:00 朝の活動',
            '11:30 食事の時間',
            '14:00 午後のリラックスタイム',
            '15:30 まとめ'
          ]
        },
        {
          id: 6,
          title: 'オオカミの群れの社会',
          question: 'リーダー（アルファ）はどのオオカミか？',
          guide: 'オオカミの社会は厳格な階級制度があります。群れの中での役割分担を詳しく研究しましょう。',
          points: [
            {
              id: 1,
              title: 'リーダーの特定',
              question: 'リーダー（アルファ）はどのオオカミか、どうやって見分けるか',
              guide: '体の大きさ、行動、他のオオカミとの関係からリーダーを見つけてみましょう'
            },
            {
              id: 2,
              title: '遠吠えの意味',
              question: '遠吠えはどんな時にするか、他のオオカミはどう反応するか',
              guide: '遠吠えが始まるきっかけと、群れ全体の反応を詳しく観察しましょう'
            },
            {
              id: 3,
              title: '階級制度',
              question: '群れの中での順位を示すような行動（耳やしっぽの動き）',
              guide: '耳やしっぽの位置、姿勢から群れの中の上下関係を読み取ってみましょう'
            },
            {
              id: 4,
              title: '社会的行動',
              question: '仲間同士のじゃれ合いや挨拶の仕方',
              guide: '鼻をつけ合う挨拶や、じゃれ合いの中にある社会的意味を考察しましょう'
            }
          ],
          schedule: [
            '10:30 朝の活動',
            '14:00 遠吠えの時間',
            '15:30 夕方の活動',
            '16:00 まとめ'
          ]
        }
      ]
    },
    bird: {
      easy: [
        {
          id: 7,
          title: 'ペンギンの陸上と水中の動きの違い',
          question: '陸上での歩き方の特徴は？',
          guide: 'ペンギンは陸上ではヨチヨチ歩きですが、水中では時速35kmで泳げます。この違いを観察しましょう。',
          points: [
            {
              id: 1,
              title: '陸上での歩行',
              question: '陸上での歩き方（ヨチヨチ歩き）の特徴',
              guide: 'ペンギンの可愛らしい歩き方の特徴を詳しく観察してみましょう'
            },
            {
              id: 2,
              title: '水中での泳法',
              question: '水中での泳ぎ方（翼を使って飛ぶように泳ぐ）',
              guide: '水中では翼を使って「空を飛ぶ」ように泳ぐ様子を観察しましょう'
            },
            {
              id: 3,
              title: '鳴き声によるコミュニケーション',
              question: '仲間との鳴き声によるコミュニケーション',
              guide: 'ペンギン同士がどんな鳴き声でやり取りしているか聞いてみましょう'
            },
            {
              id: 4,
              title: '子育ての様子',
              question: '巣作りや子育ての様子（季節による）',
              guide: '時期によっては巣作りや子育ての様子が観察できるかもしれません'
            }
          ],
          schedule: [
            '10:30 エサの時間',
            '15:00 エサの時間',
            'その他の時間 - 陸上での過ごし方観察'
          ]
        }
      ],
      normal: [
        {
          id: 8,
          title: 'フラミンゴはなぜ一本足で立つのか',
          question: '一本足で立っている時間と両足で立っている時間の比較',
          guide: 'フラミンゴが一本足で立つのには理由があります。その謎を解明してみましょう。',
          points: [
            {
              id: 1,
              title: '立ち方の統計',
              question: '一本足で立っている時間と両足で立っている時間の比較',
              guide: '30分ごとに群れ全体で一本足の個体が何羽いるか数えてみましょう'
            },
            {
              id: 2,
              title: '足の使い分け',
              question: 'どちらの足で立っていることが多いか',
              guide: '右足と左足のどちらを上げていることが多いか観察しましょう'
            },
            {
              id: 3,
              title: '休息時の姿勢',
              question: '寝るときや休むときはどんな格好か',
              guide: '首を曲げて羽に顔をうずめる行動の意味を考えてみましょう'
            },
            {
              id: 4,
              title: '環境との関係',
              question: '風の強さや気温と立ち方の関係',
              guide: '天候や気温によって立ち方が変わるかを記録してみましょう'
            }
          ],
          schedule: [
            '30分ごとの観察記録',
            '環境条件の記録'
          ]
        }
      ],
      hard: [
        {
          id: 9,
          title: 'ワシやタカの飛ぶ姿と体のつくり',
          question: '翼を広げた時の形と大きさ',
          guide: '猛禽類の飛行能力と体のつくりの関係を詳しく研究してみましょう。',
          points: [
            {
              id: 1,
              title: '翼の構造',
              question: '翼を広げた時の形と大きさ',
              guide: '翼の形が飛行にどのように適応しているかを観察しましょう'
            },
            {
              id: 2,
              title: 'ソアリング技術',
              question: '羽ばたかずに空を飛ぶ（ソアリング）様子',
              guide: '上昇気流を利用した飛行技術を詳しく観察してみましょう'
            },
            {
              id: 3,
              title: '狩猟に適した体',
              question: '獲物を捕らえるための鋭い爪とくちばしの形',
              guide: '猛禽類の体のつくりが狩猟にどう適応しているかを研究しましょう'
            },
            {
              id: 4,
              title: '視覚能力',
              question: '飛行中の目の動き（周りをどう見ているか）',
              guide: '優れた視力で周囲をどのように観察しているかを見てみましょう'
            }
          ],
          schedule: [
            'フライングバードショーでの観察',
            '猛禽舎での休息中の観察'
          ]
        }
      ]
    },
    insect: {
      easy: [
        {
          id: 10,
          title: '昆虫園のチョウの舞い方',
          question: 'チョウの種類によって飛び方はどう違うか？',
          guide: 'チョウの飛び方や花との関係を詳しく観察してみましょう。',
          points: [
            {
              id: 1,
              title: '飛行パターン',
              question: 'チョウの種類によって飛び方はどう違うか（直線的、ひらひらなど）',
              guide: '異なる種類のチョウの飛び方を比較してみましょう'
            },
            {
              id: 2,
              title: '吸蜜行動',
              question: '花の蜜を吸うときのストローのような口（口吻）の使い方',
              guide: 'チョウがどのように蜜を吸っているかを詳しく観察しましょう'
            },
            {
              id: 3,
              title: '羽の模様',
              question: '羽を閉じているときと開いているときで模様は違うか',
              guide: '表と裏で模様が違う理由を考えてみましょう'
            },
            {
              id: 4,
              title: '花の好み',
              question: 'どのチョウがどの花に集まりやすいか',
              guide: 'チョウの種類と好む花の関係を調べてみましょう'
            }
          ],
          schedule: [
            '10:00-12:00 チョウが活発な時間帯での集中観察'
          ]
        }
      ],
      normal: [
        {
          id: 11,
          title: 'ハキリアリの行列の秘密',
          question: '行列はどこからどこまで続いているか？',
          guide: 'ハキリアリの驚くべき社会性と役割分担を研究してみましょう。',
          points: [
            {
              id: 1,
              title: '行列の構造',
              question: '行列はどこからどこまで続いているか',
              guide: 'アリの行列がどこから始まってどこで終わるかを追跡してみましょう'
            },
            {
              id: 2,
              title: '運搬能力',
              question: 'アリは自分の体より大きな葉をどうやって運んでいるか',
              guide: '体重の何倍もの葉を運ぶ驚異的な能力を観察しましょう'
            },
            {
              id: 3,
              title: '役割分担',
              question: '行列の中で、葉を運ぶアリと運ばないアリの役割分担',
              guide: '働きアリの中でも役割が分かれているかを観察してみましょう'
            },
            {
              id: 4,
              title: 'コミュニケーション',
              question: 'アリ同士がすれ違う時にどんな行動をとるか（触角で触れ合うなど）',
              guide: 'アリ同士がどのように情報交換しているかを観察しましょう'
            }
          ],
          schedule: [
            'ハキリアリ展示ケースでの集中観察',
            '10分間の通過数カウント'
          ]
        }
      ],
      hard: [
        {
          id: 12,
          title: 'グローワームの光の謎',
          question: 'どんな風に光っているか？',
          guide: '生物発光のメカニズムとその意味を研究してみましょう。',
          points: [
            {
              id: 1,
              title: '発光パターン',
              question: 'どんな風に光っているか（点滅、常灯）',
              guide: '光り方のパターンを詳しく観察して記録しましょう'
            },
            {
              id: 2,
              title: '光の特性',
              question: '光の色は何色か',
              guide: '発光の色や明るさに特徴があるかを観察しましょう'
            },
            {
              id: 3,
              title: '発光部位',
              question: '光っている場所と光っていない場所があるか',
              guide: '体のどの部分が光っているかを詳しく観察しましょう'
            },
            {
              id: 4,
              title: '発光の意味',
              question: 'なぜ光る必要があるのかを考察する',
              guide: '生物発光の生態学的意味を考えてみましょう'
            }
          ],
          schedule: [
            '昆虫園本館のグローワーム展示室での観察'
          ]
        }
      ]
    },
    other: {
      easy: [
        {
          id: 13,
          title: 'いろいろな動物のしっぽの形と役割くらべ',
          question: 'しっぽの形と使い方の違いは？',
          guide: '動物によって異なるしっぽの形と役割を比較研究してみましょう。',
          points: [
            {
              id: 1,
              title: 'しっぽの形の違い',
              question: '長いしっぽ、短いしっぽ、ふさふさのしっぽなど、形の違い',
              guide: '動物の種類によってしっぽの形がどう違うかを記録しましょう'
            },
            {
              id: 2,
              title: 'バランス機能',
              question: 'ユキヒョウ（バランス）、レッサーパンダ（防寒）、カンガルー（支え）など、しっぽの使い方',
              guide: 'それぞれの動物のしっぽがどんな役割を果たしているかを観察しましょう'
            },
            {
              id: 3,
              title: '感情表現',
              question: '感情表現（犬のように振るなど）でしっぽを使っているか',
              guide: 'しっぽの動きから動物の気持ちが分かるかを観察してみましょう'
            },
            {
              id: 4,
              title: '移動での活用',
              question: '飛ぶ、泳ぐためにしっぽを使っている動物はいるか',
              guide: '移動の際にしっぽがどのような役割を果たしているかを観察しましょう'
            }
          ],
          schedule: [
            '様々な動物エリアを巡回',
            'しっぽの動きに特化した観察'
          ]
        }
      ],
      normal: [
        {
          id: 14,
          title: '動物の目の位置のひみつ',
          question: '目の位置と食べ物の関係は？',
          guide: '肉食動物と草食動物の目の位置の違いとその理由を研究してみましょう。',
          points: [
            {
              id: 1,
              title: '正面についた目',
              question: '目が顔の正面についている動物（肉食動物：トラ、オオカミなど）',
              guide: '正面に目がある動物の特徴と狩猟能力の関係を観察しましょう'
            },
            {
              id: 2,
              title: '側面についた目',
              question: '目が顔の横についている動物（草食動物：シカ、キリンなど）',
              guide: '側面に目がある動物の視野の広さと警戒能力の関係を考察しましょう'
            },
            {
              id: 3,
              title: '食べ物との関係',
              question: 'なぜ目の位置が違うのか、食べ物との関係を考察する',
              guide: '狩りをする動物と狩られる動物の目の位置の違いの意味を考えてみましょう'
            },
            {
              id: 4,
              title: '夜行性動物の特徴',
              question: '夜行性の動物の目の特徴（大きい、光るなど）',
              guide: '夜行性動物の目が昼行性動物とどう違うかを観察しましょう'
            }
          ],
          schedule: [
            '肉食動物と草食動物のエリアを比較観察',
            '顔の正面からの写真撮影'
          ]
        }
      ],
      hard: [
        {
          id: 15,
          title: '動物園の音マップづくり',
          question: '園内の各エリアでどんな音が聞こえるか？',
          guide: '多摩動物公園全体の音環境を調査し、音の地図を作成してみましょう。',
          points: [
            {
              id: 1,
              title: '音の種類調査',
              question: '園内の各エリアでどんな音が聞こえるか（動物の鳴き声、水の音、人の声）',
              guide: 'エリアごとに聞こえる音の種類を詳しく記録しましょう'
            },
            {
              id: 2,
              title: '鳴き声の分類',
              question: '動物の鳴き声の種類（吠える、鳴く、さえずるなど）',
              guide: '動物ごとに鳴き声の特徴を分類してみましょう'
            },
            {
              id: 3,
              title: '時間による変化',
              question: '時間帯によって聞こえる音は変わるか',
              guide: '午前と午後で同じ場所の音を比較してみましょう'
            },
            {
              id: 4,
              title: '音環境マップ作成',
              question: '一番静かな場所、一番賑やかな場所はどこか',
              guide: '園内マップに音の情報を書き込んで音マップを作成しましょう'
            }
          ],
          schedule: [
            '園内各ポイントで1分間の音の記録',
            '午前と午後での比較調査'
          ]
        }
      ]
    }
  };

  const generateThemes = () => {
    const categoryThemes = observationThemes[formData.category];
    if (!categoryThemes) {
      setProposedThemes(['テーマが見つかりませんでした']);
      return;
    }
    
    const difficultyLevel = formData.difficulty === '1' ? 'easy' : 
                           formData.difficulty === '2' ? 'normal' : 'hard';
    const themes = categoryThemes[difficultyLevel] || [];
    
    setProposedThemes(themes);
    setCurrentStep(1);
  };

  const selectTheme = (theme) => {
    // theme が文字列の場合（古い形式）の処理
    if (typeof theme === 'string') {
      setFormData({...formData, selectedTheme: theme});
      return;
    }
    
    // theme がオブジェクトの場合（新しい形式）の処理
    const initialPoints = theme.points.map(point => ({
      ...point,
      hypothesis: '',
      observation: '',
      observationImage: null,
      insights: ''
    }));
    
    setFormData({
      ...formData, 
      selectedTheme: theme.title,
      observationPoints: initialPoints
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const updateObservationPoint = (pointId, field, value) => {
    const updatedPoints = formData.observationPoints.map(point => 
      point.id === pointId 
        ? { ...point, [field]: value }
        : point
    );
    setFormData({ ...formData, observationPoints: updatedPoints });
  };

  const handleImageUpload = (pointId, e) => {
    const file = e.target.files[0];
    if (file) {
      updateObservationPoint(pointId, 'observationImage', file.name);
    }
  };

  const renderQuestions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">あなたについて教えてください</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">学年を選んでください</label>
        <div className="grid grid-cols-6 gap-3">
          {[1,2,3,4,5,6].map(grade => (
            <button
              key={grade}
              onClick={() => handleInputChange('grade', grade.toString())}
              className={`p-3 rounded-lg border-2 text-lg font-bold transition-colors ${
                formData.grade === grade.toString() 
                ? 'border-green-500 bg-green-100 text-green-800' 
                : 'border-gray-300 hover:border-green-300'
              }`}
            >
              {grade}年生
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">興味のある動物のカテゴリは？</label>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category.id}>
              <button
                onClick={() => handleInputChange('category', category.id)}
                className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                  formData.category === category.id 
                  ? 'border-green-500 bg-green-100 text-green-800' 
                  : 'border-gray-300 hover:border-green-300'
                }`}
              >
                <span className="font-semibold">{category.name}</span>
                <span className="text-sm text-gray-600 ml-2">
                  ({category.subcategories.join('、')})
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">難易度を選んでください</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            {level: '1', label: 'かんたん', desc: '観察中心'},
            {level: '2', label: 'ふつう', desc: '比較・分析'},
            {level: '3', label: 'むずかしい', desc: '深い研究'}
          ].map(item => (
            <button
              key={item.level}
              onClick={() => handleInputChange('difficulty', item.level)}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                formData.difficulty === item.level 
                ? 'border-green-500 bg-green-100 text-green-800' 
                : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <div className="font-bold text-lg">{item.label}</div>
              <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
              <div className="flex justify-center mt-2">
                {[...Array(parseInt(item.level))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">メールアドレス（結果送信用）</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          placeholder="example@email.com"
        />
      </div>

      <button
        onClick={generateThemes}
        disabled={!formData.grade || !formData.category || !formData.difficulty || !formData.email}
        className="w-full bg-green-600 text-white text-xl font-bold py-4 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        テーマを提案してもらう
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );

  const renderThemes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">🎯 あなたにおすすめの研究テーマ</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <p className="text-blue-800">
          <strong>{formData.grade}年生</strong>の
          <strong>{categories.find(c => c.id === formData.category)?.name}</strong>で
          <strong>難易度{formData.difficulty}</strong>のテーマをAIが選びました！
        </p>
      </div>

      <div className="space-y-4">
        {proposedThemes.map((theme, index) => {
          // 文字列の場合（古い形式）の表示
          if (typeof theme === 'string') {
            return (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer transition-colors ${
                  formData.selectedTheme === theme 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => selectTheme(theme)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{index === 0 ? '🦁' : index === 1 ? '🦒' : '🐧'}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{theme}</h3>
                    <p className="text-gray-600 text-sm">詳細な研究テーマです。</p>
                  </div>
                  {formData.selectedTheme === theme && (
                    <div className="text-green-500">
                      <Eye className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>
            );
          }
          
          // オブジェクトの場合（新しい形式）の表示
          return (
            <div
              key={theme.id}
              className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer transition-colors ${
                formData.selectedTheme === theme.title 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => selectTheme(theme)}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">
                  {formData.category === 'mammal' && ['🦁', '🦒', '🐘', '🦍', '🐺', '🐼'][index % 6]}
                  {formData.category === 'bird' && ['🐧', '🦩', '🦅', '🦚'][index % 4]}
                  {formData.category === 'insect' && ['🦋', '🐜', '✨'][index % 3]}
                  {formData.category === 'other' && ['🔍', '🗺️', '👁️'][index % 3]}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{theme.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{theme.guide}</p>
                  <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    <strong>メインテーマ：</strong>{theme.question}
                  </div>
                  {theme.schedule && (
                    <div className="text-xs text-gray-500 mt-2">
                      <strong>観察スケジュール：</strong>{theme.schedule.join(', ')}
                    </div>
                  )}
                </div>
                {formData.selectedTheme === theme.title && (
                  <div className="text-green-500">
                    <Eye className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            // より多くのテーマを表示する処理
            const categoryThemes = observationThemes[formData.category];
            if (categoryThemes) {
              const allThemes = [
                ...(categoryThemes.easy || []),
                ...(categoryThemes.normal || []),
                ...(categoryThemes.hard || [])
              ];
              setProposedThemes(allThemes.slice(0, 6)); // 最大6個まで表示
            }
          }}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
        >
          他のテーマも見たい
        </button>
        <button
          onClick={nextStep}
          disabled={!formData.selectedTheme}
          className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          このテーマに決める
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">📝 テーマ選択の理由</h2>
      
      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
        <h3 className="text-lg font-bold text-green-800 mb-2">選んだテーマ</h3>
        <p className="text-green-700">{formData.selectedTheme}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          なぜこのテーマを選びましたか？（複数選択可）
        </label>
        <div className="space-y-3">
          {[
            '動物が好きだから',
            '面白そうだから',
            '新しいことを発見したいから',
            '友達に教えたいから',
            '写真を撮りたいから',
            '動物園でよく見る動物だから'
          ].map(reason => (
            <label key={reason} className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                onChange={(e) => {
                  const current = formData.selectionReason.split(',').filter(r => r);
                  if (e.target.checked) {
                    handleInputChange('selectionReason', [...current, reason].join(','));
                  } else {
                    handleInputChange('selectionReason', current.filter(r => r !== reason).join(','));
                  }
                }}
              />
              <span className="text-gray-700">{reason}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          他に理由があれば自由に書いてください
        </label>
        <textarea
          value={formData.selectionReason}
          onChange={(e) => handleInputChange('selectionReason', e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          rows="3"
          placeholder="例：お母さんと一緒に見に行ったことがあるから..."
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          研究を始める
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderResearch = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">🔍 研究を始めよう！</h2>
      
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-blue-800 mb-2">研究テーマ</h3>
        <p className="text-blue-700">{formData.selectedTheme}</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <p className="text-yellow-800">
          <strong>📋 研究の進め方：</strong>
          それぞれの観察テーマについて、まず「予想」をしてから、実際に動物園で「観察」して、
          最後に「新しい発見や気づき」を書いてみよう！きみはどんなことを発見するかな？
        </p>
      </div>

      {formData.observationPoints.map((point, index) => (
        <div key={point.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-400">
          <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
            <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              {index + 1}
            </span>
            {point.question}を調べてみよう！
          </h3>
          
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-green-700 text-sm">
              <span className="font-bold">🎯 調べるヒント：</span>
              {point.guide}
            </p>
          </div>

              <div className="space-y-4">
            {/* 仮説 */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                💡 予想してみよう！（きっと○○だと思う！）
              </label>
              <textarea
                value={point.hypothesis}
                onChange={(e) => updateObservationPoint(point.id, 'hypothesis', e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                rows="2"
                placeholder={`「${point.question}」について、きっと○○だと思う！その理由は...`}
              />
            </div>

            {/* 観察結果 */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                👀 実際に見てわかったこと
              </label>
              <textarea
                value={point.observation}
                onChange={(e) => updateObservationPoint(point.id, 'observation', e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none mb-3"
                rows="3"
                placeholder="動物園で実際に見た様子を詳しく書いてみよう！どんなことをしていたかな？"
              />
              
              {/* 写真アップロード */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(point.id, e)}
                  className="hidden"
                  id={`photo-upload-${point.id}`}
                />
                <label htmlFor={`photo-upload-${point.id}`} className="cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                  <p className="text-gray-600 text-sm">📷 写真を撮ったら追加しよう！</p>
                  {point.observationImage && (
                    <p className="text-green-600 text-sm mt-1">📷 {point.observationImage}</p>
                  )}
                </label>
              </div>
            </div>

            {/* 気づき */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                ✨ 新しい発見・気づいたこと
              </label>
              <textarea
                value={point.insights}
                onChange={(e) => updateObservationPoint(point.id, 'insights', e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                rows="3"
                placeholder="予想と違っていたこと、びっくりしたこと、新しく知ったこと、「なぜ？」と思ったことを書いてみよう！"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          感想を書く
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderReflection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">💭 感想を聞かせてください</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          今回の研究はどうでしたか？感想を自由に書いてください
        </label>
        <textarea
          value={formData.reflection}
          onChange={(e) => handleInputChange('reflection', e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          rows="6"
          placeholder="楽しかったこと、難しかったこと、新しく知ったこと、もっと調べたいことなど、何でも書いてください..."
        />
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <p className="text-yellow-800">
          <strong>💡 ヒント：</strong>
          「○○が一番印象に残った」「○○について詳しく知れた」
          「今度は○○も調べてみたい」など、具体的に書くともっと良くなります！
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          プレビューを見る
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">📄 研究レポート完成！</h2>
      
      {/* 研究レポート用紙風デザイン */}
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mx-auto max-w-4xl" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 20' fill='none' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
             backgroundSize: '100% 20px'
           }}>
        
        {/* タイトル部分 */}
        <div className="text-center mb-8 relative">
          <div className="flex items-center justify-center mb-4">
            <div className="flex space-x-2 mr-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-brown-600 bg-white"></div>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-brown-800">の研究</h1>
            <div className="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
              1
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 text-lg">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full border border-gray-400"></span>
              <span>{formData.grade || '○'}</span>
              <span>年</span>
              <span className="w-4 h-4 rounded-full border border-gray-400"></span>
              <span>組</span>
            </div>
            <div className="flex space-x-1">
              {[1,2,3,4].map(i => (
                <span key={i} className="w-6 h-6 rounded-full border border-gray-400 inline-block"></span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            {[1,2,3,4].map(i => (
              <span key={i} className="w-6 h-6 rounded-full border border-gray-400 inline-block"></span>
            ))}
            <span>年</span>
            {[1,2].map(i => (
              <span key={i} className="w-6 h-6 rounded-full border border-gray-400 inline-block"></span>
            ))}
            <span>月</span>
            {[1,2].map(i => (
              <span key={i} className="w-6 h-6 rounded-full border border-gray-400 inline-block"></span>
            ))}
            <span>日</span>
            <div className="absolute top-12 right-0 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
              2
            </div>
          </div>
        </div>

        {/* メイン内容を2カラムレイアウト */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* 左カラム */}
          <div className="space-y-6">
            
            {/* 研究するきっかけ */}
            <div className="relative">
              <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-800 text-sm">📝 研究するきっかけ</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-b-lg min-h-[80px] relative">
                <div className="text-gray-800 text-sm leading-relaxed break-words">
                  {formData.selectionReason || '○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○'}
                </div>
                <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                  3
                </div>
              </div>
            </div>

            {/* 調べた方法 */}
            <div className="relative">
              <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-800 text-sm">🔍 調べた方法</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-b-lg min-h-[120px] relative">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-gray-800 text-sm">多摩動物公園での直接観察</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-gray-800 text-sm">写真・動画による記録</span>
                  </div>
                  <div className="mt-4 bg-white p-2 rounded border">
                    <div className="text-xs text-gray-600">観察期間・時間</div>
                    <div className="flex space-x-1 mt-1">
                      {[1,2,3,4,5,6,7,8,9,10].map(i => (
                        <span key={i} className="w-3 h-3 border border-gray-400 inline-block"></span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                  4
                </div>
              </div>
            </div>

            {/* 予想 */}
            <div className="relative">
              <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-800 text-sm">💡 予想</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-b-lg min-h-[100px] relative">
                <div className="text-gray-800 text-sm leading-relaxed">
                  {formData.observationPoints.length > 0 
                    ? formData.observationPoints.map(point => point.hypothesis).filter(h => h).join('、') 
                    : '○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○'}
                </div>
                <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                  5
                </div>
              </div>
            </div>
          </div>

          {/* 右カラム */}
          <div className="space-y-6">
            
            {/* 結果 */}
            <div className="relative">
              <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-800 text-sm">📊 結果</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-b-lg min-h-[160px] relative">
                <div className="space-y-3">
                  {formData.observationPoints.length > 0 ? (
                    formData.observationPoints.slice(0, 2).map((point, index) => (
                      <div key={index} className="text-xs">
                        <div className="font-semibold text-gray-700 mb-1">{index + 1}. {point.question}</div>
                        <div className="text-gray-600 bg-white p-2 rounded text-xs leading-tight">
                          {point.observation || '○○○○○○○○○○○○○○○○○○○○○○○○'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-800 text-sm">○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○</div>
                  )}
                  
                  {/* グラフ・表のイメージ */}
                  <div className="bg-white p-2 rounded border mt-3">
                    <div className="flex space-x-2">
                      <div className="w-16 h-10 bg-blue-200 rounded"></div>
                      <div className="w-20 h-10 bg-blue-300 rounded"></div>
                      <div className="w-12 h-10 bg-blue-200 rounded"></div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex space-x-1">
                          {[1,2,3,4,5,6,7,8,9,10].map(j => (
                            <span key={j} className="w-2 h-2 border border-gray-300 inline-block"></span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                  6
                </div>
              </div>
            </div>

            {/* わかったこと */}
            <div className="relative">
              <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-800 text-sm">💭 わかったこと</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-b-lg min-h-[100px] relative">
                <div className="text-gray-800 text-sm leading-relaxed">
                  {formData.observationPoints.length > 0 
                    ? formData.observationPoints.map(point => point.insights).filter(i => i).join('、') 
                    : '○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○'}
                </div>
                <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                  7
                </div>
              </div>
            </div>

            {/* まとめ */}
            <div className="relative">
              <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-800 text-sm">📝 まとめ</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-b-lg min-h-[100px] relative">
                <div className="text-gray-800 text-sm leading-relaxed">
                  {formData.reflection || '○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○'}
                </div>
                <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="mt-8 text-center text-xs text-gray-500 border-t pt-4">
          多摩動物公園 自由研究作成ツールで作成
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-blue-800 mb-4">📤 レポートを保存・共有</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <button className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors">
            <FileDown className="w-5 h-5" />
            PDF保存
          </button>
          
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            <Mail className="w-5 h-5" />
            メール送信
          </button>
          
          <button className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            <Share2 className="w-5 h-5" />
            SNS共有
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" id="sns-consent" className="w-4 h-4" />
          <label htmlFor="sns-consent">
            SNS共有に同意します（個人情報は含まれません）
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る
        </button>
        <button
          onClick={() => {
            alert('研究レポートが完成しました！🎉\n素晴らしい研究をありがとうございました！');
            setCurrentStep(0);
            setFormData({
              grade: '', category: '', difficulty: '', email: '',
              selectedTheme: '', selectionReason: '', observationPoints: [], reflection: ''
            });
          }}
          className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          🎉 完了！
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-green-700 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🦁 多摩動物公園 自由研究作成ツール
          </h1>
          <p className="text-green-100 mt-1">動物たちと一緒に素敵な研究をしよう！</p>
        </div>
      </header>

      {/* プログレスバー */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 ${
                  index === currentStep ? 'text-green-600 font-bold' : 
                  index < currentStep ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === currentStep ? 'bg-green-600 text-white' :
                  index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {index < currentStep ? '✓' : step.icon}
                </div>
                <span className="hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto p-6">
        {currentStep === 0 && renderQuestions()}
        {currentStep === 1 && renderThemes()}
        {currentStep === 2 && renderSelection()}
        {currentStep === 3 && renderResearch()}
        {currentStep === 4 && renderReflection()}
        {currentStep === 5 && renderPreview()}
      </main>

      {/* フッター */}
      <footer className="bg-green-700 text-white p-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-100">© 多摩動物公園 自由研究作成ツール</p>
        </div>
      </footer>
    </div>
  );
};

export default TamaZooResearchTool;