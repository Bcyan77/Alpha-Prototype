import type { MemberProfile, MemberId } from "@/types";

export const MEMBER_IDS: MemberId[] = [
  "yeonjae",
  "hongkyung",
  "hyerin",
  "sungjin",
  "hyunjun",
];

export const MEMBERS: Record<MemberId, MemberProfile> = {
  yeonjae: {
    id: "yeonjae",
    name: "김연재",
    mbti: "ISTP",
    oneLiner: "한줄 자기소개", // TODO: 팀원 제공
    traits: [
      "미디어아트 로직 개발 전문 (유니티)",
      "다양한 개발 언어를 두루 경험",
      "생각이 많은 사색가 타입",
      "미적으로 보기 좋은 작품을 추구",
      "묵묵하게 팀을 지탱하는 수호자",
    ],
    photo: "/images/members/연재@4x.png",
    character: "/images/characters/yeonjae.png",
    cakeIcon: "/images/cake-icons/yeonjae.png",
    skills: ["Unity", "Unreal", "React", "R", "TouchDesigner"],
    direction: "미디어아트",
    instagram: "y20n_jae",
  },
  hongkyung: {
    id: "hongkyung",
    name: "김홍경",
    mbti: "ESFJ",
    oneLiner: "한줄 자기소개", // TODO: 팀원 제공
    traits: [
      "현실에 직시하고 빠르게 해결하는 편",
      "개발보다 디자인과 기획에 관심",
      "서글서글하게 잘 지내는 편",
      "튀지 않지만 의외로 광기 넘침",
      "겉으로는 덤벙거려도 의외의 섬세함",
    ],
    photo: "/images/members/홍경@4x.png",
    character: "/images/characters/hongkyung.png",
    cakeIcon: "/images/cake-icons/hongkyung.png",
    skills: ["Maya", "Unity", "Premiere Pro", "Photoshop", "Python"],
    direction: "프로젝션 맵핑, 공간연출",
    instagram: "kimongg29",
  },
  hyerin: {
    id: "hyerin",
    name: "황혜린",
    mbti: "INFP",
    oneLiner: "한줄 자기소개", // TODO: 팀원 제공
    traits: [
      "특징 1", // TODO: 팀원 제공
      "특징 2",
      "특징 3",
      "특징 4",
      "특징 5",
    ],
    photo: "/images/members/혜린@4x.png",
    character: "/images/characters/hyerin.png",
    cakeIcon: "/images/cake-icons/hyerin.png",
    skills: [], // TODO: 확인 필요
    direction: "", // TODO: 확인 필요
    instagram: "hyerinci",
  },
  sungjin: {
    id: "sungjin",
    name: "오성진",
    mbti: "INTP",
    oneLiner: "한줄 자기소개", // TODO: 팀원 제공
    traits: [
      "T발 너 C야? 라는 말을 듣는 사람",
      "살면서 나보다 게으른 사람을 본적이 없다",
      "내 컴퓨터 셋업이 몸값보다 비싸다",
      "게임과 애니를 사랑하는 덕후",
      "하나의 세계관 미디어 믹스를 꿈꾸는 사람",
    ],
    photo: "/images/members/성진@4x.png",
    character: "/images/characters/sungjin.png",
    cakeIcon: "/images/cake-icons/sungjin.png",
    skills: ["Python", "C", "Unity", "Unreal", "AI", "Server/CI-CD"],
    direction: "미디어 믹스 (게임/애니)",
    instagram: "bcyan77",
  },
  hyunjun: {
    id: "hyunjun",
    name: "오현준",
    mbti: "INFJ",
    oneLiner: "한줄 자기소개", // TODO: 팀원 제공
    traits: [
      "특징 1", // TODO: 팀원 제공
      "특징 2",
      "특징 3",
      "특징 4",
      "특징 5",
    ],
    photo: "/images/members/현준@4x.png",
    character: "/images/characters/hyunjun.png",
    cakeIcon: "/images/cake-icons/hyunjun.png",
    skills: ["Unity", "Unreal", "Photoshop"],
    direction: "손 인식 리듬 게임",
    instagram: "hyunjoon_2257",
  },
};
