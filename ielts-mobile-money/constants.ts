import { PassageData, QuestionSectionData } from './types';

export const PASSAGE: PassageData = {
  title: 'Money Transfers by Mobile',
  paragraphs: [
    {
      id: 'A',
      content: 'The ping of a text message has never sounded so sweet. In what is being touted as a world first, Kenya’s biggest mobile operator is allowing subscribers to send cash to other phone users by SMS. Known as M-Pesa, or mobile money, the service is expected to revolutionise banking in a country where more than 80% of people are excluded from the formal financial sector. Apart from transferring cash - a service much in demand among urban Kenyans supporting relatives in rural areas - customers of the Safaricom network will be able to keep up to 50,000 shillings (£370) in a “virtual account” on their handsets.',
    },
    {
      id: 'B',
      content: 'Developed by Vodafone, which holds a 35% share in Safaricom, M-Pesa was formally launched in Kenya two weeks ago. More than 10,000 people have signed up for the service, with around 8 million shillings transferred so far, mostly in tiny denominations. Safaricom’s executives are confident that growth will be strong in Kenya, and later across Africa. “We are effectively giving people ATM cards without them ever having to open a real bank account,” said Michael Joseph, chief executive of Safaricom, who called the money transfer concept the “next big thing” in mobile telephony.',
    },
    {
      id: 'C',
      content: 'M-Pesa’s is simple. There is no need for a new handset or SIM card. To send money, you hand over the cash to a registered agent - typically a retailer - who credits your virtual account. You then send between 100 shillings (74p) and 35,000 shillings (£259) via text message to the desired recipient - even someone on a different mobile network - who cashes it at an agent by entering a secret code and showing ID. A commission of up to 170 shillings (£1.25) is paid by the recipient but it compares favourably with fees levied by the major banks, whose services are too expensive for most of the population.',
    },
    {
      id: 'D',
      content: 'Mobile phone growth in Kenya, as in most of Africa, has been remarkable, even among the rural poor. In June 1999, Kenya had 15,000 mobile subscribers. Today, it has nearly 8 million out of a population of 35 million, and the two operators’ networks are as extensive as the access to banks is limited. Safaricom says it is not so much competing with financial services companies as filling a void. In time, M-Pesa will allow people to borrow and repay money, and make purchases. Companies will be able to pay salaries directly into workers’ phones - something that has already attracted the interest of larger employers, such as the tea companies, whose workers often have to be paid in cash as they do not have bank accounts. There are concerns about security, but Safaricom insists that even if someone’s phone is stolen, the PIN system prevents unauthorised withdrawals. Mr. Joseph said the only danger is sending cash to the wrong mobile number and the recipient redeeming it straight away.',
    },
    {
      id: 'E',
      content: 'The project is being watched closely by mobile operators around the world as a way of targeting the multibillion pound international cash transfer industry long dominated by companies such as Western Union and Moneygram. Remittances sent from nearly 200 million migrant workers to developing countries totalled £102 billion last year, according to the World Bank. The GSM Association, which represents more than 700 mobile operators worldwide, believes this could quadruple by 2012 if transfers by SMS become the norm. Vodafone has entered a partnership with Citigroup that will soon allow Kenyans in the UK to send money home via text message. The charge for sending £50 is expected to be about £3, less than a third of what some traditional services charge.',
    },
  ],
};

export const QUESTION_SECTIONS: QuestionSectionData[] = [
  {
    title: 'Questions 1-4',
    instruction: 'The text has 5 paragraphs (A - E). Which paragraph contains each of the following pieces of information?',
    questions: [
      { id: '1', type: 'matching', prompt: 'A possible security problem', options: ['A', 'B', 'C', 'D', 'E'], answer: 'D', paragraphId: 'D' },
      { id: '2', type: 'matching', prompt: 'The cost of M-Pesa', options: ['A', 'B', 'C', 'D', 'E'], answer: 'C', paragraphId: 'C' },
      { id: '3', type: 'matching', prompt: 'An international service similar to M-Pesa', options: ['A', 'B', 'C', 'D', 'E'], answer: 'E', paragraphId: 'E' },
      { id: '4', type: 'matching', prompt: 'The fact that most Kenyans do not have a bank account', options: ['A', 'B', 'C', 'D', 'E'], answer: 'A', paragraphId: 'A' },
    ],
  },
  {
    title: 'Questions 5-8',
    instruction: 'Complete the following sentences using',
    specialInstruction: 'NO MORE THAN THREE WORDS',
    questions: [
      { id: '5', type: 'fill-in-blank', prompt: { before: 'Safaricom is the', after: 'mobile phone company in Kenya.' }, answer: ['biggest'], paragraphId: 'A' },
      { id: '6', type: 'fill-in-blank', prompt: { before: 'An M-Pesa account needs to be credited by', after: '.' }, answer: ['a registered agent', 'an agent'], paragraphId: 'C' },
      { id: '7', type: 'fill-in-blank', prompt: { before: '', after: 'companies are particularly interested in using M-Pesa.' }, answer: ['Tea'], paragraphId: 'D' },
      { id: '8', type: 'fill-in-blank', prompt: { before: 'Companies like Moneygram and Western Union have', after: 'the international money transfer market.' }, answer: ['dominated', 'long dominated'], paragraphId: 'E' },
    ],
  },
  {
    title: 'Questions 9-13',
    instruction: 'Do the statements on the next page agree with the information given in Reading Passage 1? In boxes 9 - 13 on your answer sheet, write',
    questions: [
      { id: '9', type: 'tfn', prompt: 'Most Kenyans working in urban areas have relatives in rural areas.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN', paragraphId: 'A' },
      { id: '10', type: 'tfn', prompt: 'So far, most of the people using M-Pesa have used it to send small amounts of money.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', paragraphId: 'B' },
      { id: '11', type: 'tfn', prompt: 'M-Pesa can only be used by people using one phone network.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', paragraphId: 'C' },
      { id: '12', type: 'tfn', prompt: 'M-Pesa can be used to buy products and services.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', paragraphId: 'D' },
      { id: '13', type: 'tfn', prompt: 'The GSM Association is a consumer organisation.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', paragraphId: 'E' },
    ],
  },
];