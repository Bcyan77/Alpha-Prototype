import type { QuizQuestion } from "@/types";

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "어어엇?! 바닥이 흔들린다… 이거 설마 지진?!",
    subtitle: "이 상황에서 당신은?",
    answers: [
      {
        text: "오늘따라 층간소음이 심하네",
        description: "오늘은 윗집이 좀 시끄럽네... 배게 털고 다시 잔다",
        memberId: "yeonjae",
      },
      {
        text: "지도를 보고 대피소 위치를 확인한다",
        description: "이미 전국 대피소 평점 리스트를 엑셀로 정리해뒀지",
        memberId: "hongkyung",
      },
      {
        text: "다른 사람들을 돕는다",
        description: "옆집 강아지, 앞집 화분까지 다 대피시키다가 본인이 부상",
        memberId: "hyerin",
      },
      {
        text: "아니 저 가방에서 이게 다 나와?",
        description: "이럴 줄 알고 에어프라이어까지 챙겨뒀지",
        memberId: "hyunjun",
      },
      {
        text: "가방에서 지진계를 꺼낸다",
        description: "P파 규모가 이정도면...",
        memberId: "sungjin",
      },
    ],
  },
  {
    id: 2,
    title: "어쩌다 보니 밴드 공연 무대에 서게 된 당신…!",
    subtitle: "하나의 악기를 마스터 할 수 있다면?",
    answers: [
      {
        text: "기타",
        description: "실력보다 '치명적인 눈빛'과 무대 매너에 진심인 공연 주인공",
        memberId: ["hyunjun", "hyerin"],
      },
      {
        text: "건반",
        description: "건반 위에서 자기만의 감성을 풀어내는 분위기 메이커",
        memberId: [],
      },
      {
        text: "드럼",
        description: "틀릴까 봐 숨도 참고 치는, 박자에 영혼을 판 인간 메트로놈",
        memberId: "hongkyung",
      },
      {
        text: "바이올린",
        description: "밴드 틈에서 혼자 우아하게 독주하는 고귀한 광기",
        memberId: "sungjin",
      },
      {
        text: "베이스",
        description: "친구들의 박자를 맞춰주는 묵묵한 수호요정",
        memberId: "yeonjae",
      },
    ],
  },
  {
    id: 3,
    title: '"이거 설명할 사람?" 교수님이 말씀하시며 이곳저곳 살펴본다',
    subtitle: "갑자기 교수님과 눈이 마주쳤다. 당신의 행동은?",
    answers: [
      {
        text: "동공이 흔들리며 부처님 미소를 짓는다",
        description: "제발 저 고르지 마세요 교수님ㅜㅜ",
        memberId: "hyunjun",
      },
      {
        text: "무념무상 강의자료만 쳐다본다",
        description: "나는 아무 생각이 없다 왜냐하면 아무 생각이 없기 때문이다",
        memberId: "yeonjae",
      },
      {
        text: "필사적으로 교수님의 눈을 피한다",
        description: "절대 마주치면 안 돼..!",
        memberId: "hongkyung",
      },
      {
        text: "교수님 이 친구가 설명할 수 있답니다!",
        description: "옆 친구를 가리키며",
        memberId: "hyerin",
      },
      {
        text: "역으로 교수님이 부담스러워하실 정도로 쳐다본다",
        description: "저요 저!!!",
        memberId: "sungjin",
      },
    ],
  },
  {
    id: 4,
    title: "학교 축제 날 사람이 엄청 많다",
    subtitle: "당신은 어디에 있을까?",
    answers: [
      {
        text: "축제도 식후경이지! 푸드트럭!",
        description: "푸드트럭 라인업은 공연라인업보다 먼저 확인했다",
        memberId: "hyunjun",
      },
      {
        text: "이불 밖은 위험해…",
        description: "집에서 넷플릭스를 본다",
        memberId: "hyerin",
      },
      {
        text: "과제하느라 축제에서 놀 시간이 없다",
        description: "피곤한 얼굴로 몬스터를 들고 집으로 간다",
        memberId: "sungjin",
      },
      {
        text: "이런 날 놀아야지!",
        description: "신나게 축제 부스를 즐기러 간다",
        memberId: "hongkyung",
      },
      {
        text: "오늘 축제였어?",
        description: "학교 축제를 하는 중인지도 몰랐다",
        memberId: "yeonjae",
      },
    ],
  },
  {
    id: 5,
    title: "당신의 컴퓨터 바탕화면 상태는?",
    subtitle: "",
    answers: [
      {
        text: "0개",
        description: "사람이 맞긴 한가..?",
        memberId: "sungjin",
      },
      {
        text: "1~10개",
        description: "정리 잘하는 사람",
        memberId: ["hyunjun", "hongkyung"],
      },
      {
        text: "11~30개",
        description: "파일 찾을 때마다 숨은그림찾기",
        memberId: "yeonjae",
      },
      {
        text: "30개 이상",
        description: "나만 어디 있는지 안다",
        memberId: "hyerin",
      },
    ],
  },
];
