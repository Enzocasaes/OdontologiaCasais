import draIanaImage from "@/images/DraIana.jpg";
import drChristianImage from "@/images/DrChristian.jpg";
import drDeivsonImage from "@/images/DrDeivson.jpeg";

/*
 * Equipe, usada na home e no JSON-LD (Person). De propósito, nenhum tratamento é
 * vinculado a um profissional específico.
 */
export const team = [
  {
    slug: "dra-iana-guedes",
    name: "Dra. Iana Guedes",
    role: "Dentística, Prótese e Ortodontia",
    cro: "CRO-MG 58340",
    summary: "Pós-graduada em Dentística e em Prótese Dentária, especializando em Ortodontia. Cuida da estética e da função do sorriso.",
    bio: "Tenho a convicção de que a odontologia vai muito além de tratar dentes: ela tem o poder de transformar vidas. Ao longo da minha trajetória, busco constantemente novos conhecimentos para oferecer tratamentos de excelência, sempre aliados a um atendimento humanizado. Acredito que cada paciente é único e merece ser acolhido com carinho, atenção e respeito. Meu propósito é cuidar de pessoas, devolver confiança, promover saúde e proporcionar sorrisos que reflitam felicidade e bem-estar.",
    image: draIanaImage,
    position: "50% 22%",
  },
  {
    slug: "dr-christian-freitas",
    name: "Dr. Christian Freitas",
    role: "Endodontia e Radiologia",
    cro: "CRO-MG 62584",
    summary: "Especialista em Endodontia e pós-graduando em Radiologia Odontológica. Formado pela UFJF-GV, associado à SBPqO e à IADR.",
    bio: "Sou cirurgião-dentista graduado pela Universidade Federal de Juiz de Fora – Campus Governador Valadares (UFJF-GV), especialista em Endodontia, capacitado em Blindagem de Dentes Tratados Endodonticamente e, atualmente, pós-graduando em Radiologia Odontológica. Minha atuação é voltada à preservação dos dentes naturais por meio de diagnósticos precisos e tratamentos endodônticos realizados com técnicas modernas. Acredito que cada paciente merece um atendimento humanizado, transparente e individualizado.",
    image: drChristianImage,
    position: "50% 18%",
  },
  {
    slug: "dr-deivson-norte",
    name: "Dr. Deivson Norte",
    role: "Implantodontia",
    cro: "CRO-MG 78629",
    summary: "Cirurgião-dentista com imersão em Implantodontia. Traz da carreira na Polícia Militar a disciplina e o compromisso de servir.",
    bio: "Há histórias que não mudam de propósito, apenas de missão. A minha começou vestindo uma farda da Polícia Militar, onde aprendi que servir ao próximo exige coragem, disciplina e compromisso. Com o passar do tempo, nasceu uma nova paixão: a Odontologia. Descobri que também era possível transformar vidas por meio de um sorriso, aliviar dores, devolver autoestima e cuidar das pessoas de uma forma diferente, mas igualmente importante.",
    image: drDeivsonImage,
    position: "50% 15%",
  },
] as const;

export type TeamMember = (typeof team)[number];
