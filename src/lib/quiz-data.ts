import type { QuizQuestion } from "@/types";

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "어어엇?! 바닥이 흔들린다… 이거 설마 지진?!",
    subtitle: "이 상황에서 당신은?",
    answers: [
      {
        text: "오늘따라 층간소음이 심하네",
        description: "윗집 오늘은 진짜 세게 뛰네… 베개 털고 다시 잔다.",
        memberId: "yeonjae",
      },
      {
        text: "지도를 확인하여 대피소의 위치를 확인한다",
        description: "이미 전국 대피소 평점 리스트를 엑셀로 정리해뒀다.",
        memberId: "hongkyung",
      },
      {
        text: "다른 사람들을 돕다가 다친다",
        description: "옆집 강아지, 앞집 화분까지 다 대피시키다가 본인이 부상자.",
        memberId: "hyerin",
      },
      {
        text: "아니 저 가방에서 이게 왜 다 나와?",
        description: "에어프라이어까지 챙기려다 가방 안 닫힘.",
        memberId: "hyunjun",
      },
      {
        text: "갑자기 가방에서 지진계를 꺼내며",
        description: "잠깐… 아직 P파만 온 것 같은데? S파까지 봐야 진짜 지진인지 알 수 있지.",
        memberId: "sungjin",
      },
    ],
  },
  {
    id: 2,
    title: "하나의 악기를 마스터 할 수 있다면?",
    subtitle: "어쩌다 보니 밴드 공연 무대에 서게 된 당신…!",
    answers: [
      {
        text: "기타",
        description: "실력보다 '치명적인 눈빛'과 무대 매너에 진심인 공연 주인공.",
        memberId: "hyunjun",
      },
      {
        text: "기타",
        description: "실력보다 '치명적인 눈빛'과 무대 매너에 진심인 공연 주인공.",
        memberId: "hyerin",
      },
      {
        text: "드럼",
        description: "틀릴까 봐 숨도 참고 치는, 박자에 영혼을 판 인간 메트로놈.",
        memberId: "hongkyung",
      },
      {
        text: "바이올린",
        description: "밴드 틈에서 혼자 우아하게 독주하는 고귀한 광기.",
        memberId: "sungjin",
      },
      {
        text: "베이스",
        description: "친구들의 박자를 맞춰주는 묵묵한 수호요정.",
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
        description: "",
        memberId: "yeonjae",
      },
      {
        text: "필사적으로 교수님의 눈을 피한다",
        description: "",
        memberId: "hongkyung",
      },
      {
        text: '옆 친구를 가리키며 "이 친구가 설명할 수 있답니다!"',
        description: "",
        memberId: "hyerin",
      },
      {
        text: "역으로 교수님이 부담스러워할 정도로 쳐다본다",
        description: "",
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
        description: "푸드트럭 라인업은 공연라인업보다 먼저 확인했다.",
        memberId: "hyunjun",
      },
      {
        text: "이불 밖은 위험해… 집에서 넷플릭스",
        description: "",
        memberId: "hyerin",
      },
      {
        text: "과제하느라 축제에서 놀 시간이 없다!",
        description: "피곤한 얼굴로 몬스터를 들고",
        memberId: "sungjin",
      },
      {
        text: "신나게 축제 부스를 즐기러!",
        description: "",
        memberId: "hongkyung",
      },
      {
        text: "학교 축제를 하는 중인지도 모른다",
        description: "",
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
        description: "너… 사람이야 AI야…?",
        memberId: "sungjin",
      },
      {
        text: "1~10개",
        description: "정리 잘하는 사람 (존경)",
        memberId: "hyunjun",
      },
      {
        text: "1~10개",
        description: "정리 잘하는 사람 (존경)",
        memberId: "hongkyung",
      },
      {
        text: "11~30개",
        description: "파일 찾을 때마다 숨은그림찾기",
        memberId: "yeonjae",
      },
      {
        text: "30개 이상",
        description: '"나만 어디 있는지 안다"',
        memberId: "hyerin",
      },
    ],
  },
];
