// FINE Auditing — content
// All copy from FINE 2026 Profile.pdf and partners profile doc.

const NAV = [
  { page: "home",     href: "index.html",         label: "Home",         vn: "Trang chủ" },
  { page: "about",    href: "about.html",         label: "About Us",     vn: "Về chúng tôi" },
  { page: "team",     href: "our-team.html",      label: "Our Team",     vn: "Đội ngũ" },
  { page: "services", href: "our-services.html",  label: "Our Services", vn: "Dịch vụ" },
  { page: "partners", href: "our-partners.html",  label: "Our Partners", vn: "Đối tác" },
];

const VALUES = [
  {
    word: "Integrity",
    vn: "Chính trực",
    initial: "I",
    blurb:
      "Integrity is the foundation of our professional conduct. We uphold the highest ethical standards in every engagement, fostering trust and confidence among our clients and stakeholders.",
    blurb_vn:
      "Chính trực là nền tảng cốt lõi định hình bản sắc nghề nghiệp của FINE. Chúng tôi duy trì các tiêu chuẩn đạo đức cao nhất trong từng dịch vụ cung cấp, qua đó xây dựng và củng cố niềm tin của khách hàng cũng như các bên liên quan.",
  },
  {
    word: "Fortunate",
    vn: "Thịnh vượng",
    initial: "F",
    blurb:
      "We transform financial data into meaningful insights, empowering clients to identify opportunities, manage risks, and achieve sustainable growth.",
    blurb_vn:
      "Chúng tôi chuyển hóa dữ liệu tài chính thành những hiểu biết có giá trị, giúp khách hàng nhận diện cơ hội, kiểm soát rủi ro và tạo ra động lực tăng trưởng bền vững.",
  },
  {
    word: "Everlasting",
    vn: "Trường tồn",
    initial: "E",
    blurb:
      "FINE partners with clients throughout the business lifecycle, focusing on long-term solutions that ensure stability, resilience, and enduring success.",
    blurb_vn:
      "FINE đồng hành cùng khách hàng trong suốt vòng đời kinh doanh, hướng đến các giải pháp dài hạn và giá trị bền vững, đảm bảo sự phát triển ổn định và lâu dài cho khách hàng.",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Audit & Assurance",
    title_vn: "Kiểm toán & Đảm bảo",
    tag: "Audit",
    short:
      "Our audit and assurance expertise helps organizations strengthen transparency, improve reporting reliability and support informed business decisions.",
    short_vn:
      "Dịch vụ kiểm toán và đảm bảo của chúng tôi hỗ trợ doanh nghiệp nâng cao tính minh bạch, cải thiện độ tin cậy của báo cáo và thúc đẩy các quyết định kinh doanh dựa trên cơ sở thông tin vững chắc.",
    overview:
      "Reliable financial information is fundamental to sustainable business growth. FINE provides comprehensive audit and assurance services designed to enhance confidence in financial reporting, strengthen governance and improve operational effectiveness. Our professionals combine technical excellence with industry insight to deliver practical recommendations beyond compliance requirements.",
    overview_vn:
      "Thông tin tài chính đáng tin cậy là nền tảng cốt lõi cho sự tăng trưởng bền vững của doanh nghiệp. FINE cung cấp các dịch vụ kiểm toán và đảm bảo toàn diện, được thiết kế nhằm củng cố niềm tin vào báo cáo tài chính, nâng cao chất lượng quản trị và cải thiện hiệu quả hoạt động. Đội ngũ chuyên gia của chúng tôi kết hợp năng lực chuyên môn sâu rộng với hiểu biết ngành, mang đến các khuyến nghị mang tính thực tiễn, vượt trên yêu cầu tuân thủ.",
    bullets: [
      "Statutory financial statement audits in accordance with Vietnamese regulations and applicable accounting standards",
      "Group reporting audits and reporting packages for multinational corporations",
      "Financial statement review engagements and agreed-upon procedures engagements",
      "Special purpose audits",
      "Financial due diligence reviews for investment and transaction purposes",
      "Internal audit and internal control system assessment",
      "Construction completion audits and capital expenditure audits",
    ],
    bullets_vn: [
      "Kiểm toán báo cáo tài chính theo quy định pháp luật Việt Nam và các chuẩn mực kế toán hiện hành",
      "Kiểm toán báo cáo tập đoàn và cung cấp các thông tin phục vụ cho báo cáo kiểm toán của tập đoàn",
      "Dịch vụ soát xét báo cáo tài chính và thực hiện các thủ tục theo thỏa thuận",
      "Kiểm toán cho mục đích đặc biệt",
      "Thẩm định tài chính phục vụ mục đích đầu tư và giao dịch",
      "Kiểm toán nội bộ và đánh giá hệ thống kiểm soát nội bộ",
      "Kiểm toán quyết toán công trình xây dựng và kiểm toán chi phí đầu tư",
    ],
  },
  {
    num: "02",
    title: "Taxation",
    title_vn: "Tư vấn thuế",
    tag: "Tax",
    short:
      "Our tax professionals help organizations manage tax risks, maintain compliance and develop efficient tax strategies in an increasingly complex regulatory environment.",
    short_vn:
      "Đội ngũ chuyên gia thuế của chúng tôi hỗ trợ doanh nghiệp quản lý rủi ro thuế, đảm bảo tuân thủ quy định và xây dựng các chiến lược thuế hiệu quả trong bối cảnh môi trường pháp lý ngày càng phức tạp.",
    overview:
      "Tax should be viewed not merely as a compliance obligation but as an integral element of business strategy. FINE supports organizations in addressing domestic and international tax matters through practical and commercially focused advice.",
    overview_vn:
      "Thuế không nên chỉ được xem là nghĩa vụ tuân thủ mà còn là một yếu tố không thể thiếu trong chiến lược kinh doanh. FINE hỗ trợ doanh nghiệp xử lý các vấn đề thuế trong nước và quốc tế thông qua tư vấn thực tiễn và định hướng thương mại.",
    bullets: [
      "Corporate Income Tax (CIT), Value Added Tax (VAT), Personal Income Tax (PIT), Foreign Contractor Tax (FCT) advisory",
      "Tax compliance, tax filing and tax reporting services",
      "Tax health checks and tax risk assessments",
      "Assistance with tax inspections and tax audits",
      "Transfer pricing advisory and preparation of transfer pricing documentation",
      "Advisory on Global Minimum Tax (Pillar Two)",
    ],
    bullets_vn: [
      "Tư vấn thuế Thu nhập Doanh nghiệp (CIT), Thuế Giá trị Gia tăng (VAT), Thuế Thu nhập Cá nhân (PIT) và Thuế Nhà thầu nước ngoài (FCT)",
      "Dịch vụ kê khai, nộp và lập báo cáo thuế",
      "Rà soát hồ sơ thuế và đánh giá rủi ro thuế",
      "Hỗ trợ trong quá trình thanh tra, kiểm tra và kiểm toán thuế",
      "Tư vấn giao dịch liên kết và lập hồ sơ xác định giá giao dịch liên kết",
      "Tư vấn áp dụng Thuế Tối thiểu Toàn cầu",
    ],
  },
  {
    num: "03",
    title: "Accountancy",
    title_vn: "Kế toán",
    tag: "Accounting",
    short:
      "Our accounting solutions help businesses build reliable financial information systems and support effective management decision-making.",
    short_vn:
      "Các giải pháp kế toán của chúng tôi hỗ trợ doanh nghiệp xây dựng hệ thống thông tin tài chính đáng tin cậy, đồng thời nâng cao hiệu quả trong quá trình ra quyết định quản trị.",
    overview:
      "Organizations increasingly require accurate and timely financial information to support operational and strategic decisions. FINE assists clients in developing robust accounting frameworks and maintaining compliance with evolving reporting requirements.",
    overview_vn:
      "Trong bối cảnh doanh nghiệp ngày càng đòi hỏi thông tin tài chính chính xác và kịp thời để phục vụ các quyết định vận hành và chiến lược, FINE hỗ trợ khách hàng xây dựng hệ thống kế toán vững chắc và đảm bảo tuân thủ các yêu cầu báo cáo ngày càng phát triển.",
    bullets: [
      "Accounting outsourcing and bookkeeping services",
      "Design and implementation of accounting systems and chart of accounts",
      "Monthly, quarterly and annual financial reporting",
      "Management reporting and financial analysis",
      "Conversion between VAS and IFRS reporting requirements",
      "Accounting policy manuals and process documentation",
      "Accounting advisory and technical consultations",
      "Training and support for internal accounting teams",
    ],
    bullets_vn: [
      "Dịch vụ kế toán thuê ngoài và ghi sổ kế toán",
      "Thiết kế và triển khai hệ thống kế toán và hệ thống tài khoản",
      "Lập báo cáo tài chính định kỳ (tháng, quý, năm)",
      "Lập báo cáo quản trị và phân tích tài chính",
      "Chuyển đổi báo cáo tài chính từ VAS sang IFRS",
      "Xây dựng sổ tay chính sách kế toán và tài liệu quy trình",
      "Tư vấn kế toán và hỗ trợ kỹ thuật chuyên sâu",
      "Đào tạo và hỗ trợ đội ngũ kế toán nội bộ",
    ],
  },
  {
    num: "04",
    title: "Payroll",
    title_vn: "Tiền lương",
    tag: "Payroll",
    short:
      "Our payroll professionals help organizations maintain efficient payroll administration and workforce compliance.",
    short_vn:
      "Đội ngũ chuyên gia của chúng tôi hỗ trợ doanh nghiệp duy trì hệ thống quản lý tiền lương hiệu quả, đồng thời đảm bảo tuân thủ đầy đủ các quy định pháp luật về lao động.",
    overview:
      "Managing payroll involves more than salary calculations. It requires compliance with labor regulations, social insurance obligations and changing legal requirements. FINE delivers payroll services with confidentiality, accuracy and operational efficiency.",
    overview_vn:
      "Quản lý tiền lương không chỉ dừng lại ở việc tính toán thu nhập. Hoạt động này đòi hỏi phải tuân thủ đầy đủ các quy định pháp luật về lao động, nghĩa vụ bảo hiểm và các yêu cầu pháp lý thường xuyên thay đổi. FINE cung cấp dịch vụ tiền lương với tiêu chuẩn cao về bảo mật, độ chính xác và hiệu quả vận hành.",
    bullets: [
      "Payroll processing for local and expatriate employees",
      "Monthly salary calculations",
      "Personal Income Tax calculations and declarations",
      "Social insurance, health insurance and unemployment insurance filings",
      "Registration procedures with social insurance authorities",
      "Labor law and payroll compliance advisory",
      "Employment contract and employee-related support",
      "Updates on regulatory changes and compliance requirements",
    ],
    bullets_vn: [
      "Xử lý và quản lý bảng lương cho nhân sự trong nước và người lao động nước ngoài",
      "Tính lương hàng tháng",
      "Tính toán và kê khai thuế Thu nhập Cá nhân (PIT)",
      "Khai báo bảo hiểm xã hội, bảo hiểm y tế và bảo hiểm thất nghiệp",
      "Thực hiện thủ tục đăng ký với cơ quan bảo hiểm xã hội",
      "Tư vấn tuân thủ pháp luật lao động và quy định về tiền lương",
      "Hỗ trợ về hợp đồng lao động và các vấn đề liên quan đến người lao động",
      "Cập nhật kịp thời các thay đổi về quy định pháp lý và yêu cầu tuân thủ",
    ],
  },
  {
    num: "05",
    title: "Business Set-up",
    title_vn: "Thành lập doanh nghiệp",
    tag: "Set-up",
    short:
      "Our business establishment solutions help investors build a strong foundation from market entry through operational readiness.",
    short_vn:
      "Các giải pháp thành lập doanh nghiệp của chúng tôi hỗ trợ nhà đầu tư xây dựng nền tảng vững chắc, từ giai đoạn gia nhập thị trường đến khi sẵn sàng vận hành.",
    overview:
      "Establishing a business requires navigating legal, regulatory and operational considerations. FINE supports domestic and foreign investors throughout the business establishment process.",
    overview_vn:
      "Việc thành lập doanh nghiệp đòi hỏi phải quản lý hiệu quả các yêu cầu về pháp lý, tuân thủ và vận hành. FINE đồng hành cùng cả nhà đầu tư trong nước và quốc tế trong suốt quá trình thành lập doanh nghiệp, từ giai đoạn chuẩn bị đến khi chính thức đi vào hoạt động.",
    bullets: [
      "Business structure and market entry advisory",
      "Incorporation of Limited Liability Companies and Joint Stock Companies",
      "Registration of representative offices and branches",
      "Foreign investment licensing advisory",
      "Corporate governance and organizational structuring",
      "Post-licensing compliance support",
      "Initial accounting and tax registration procedures",
      "Legal and operational setup assistance",
    ],
    bullets_vn: [
      "Tư vấn cấu trúc doanh nghiệp và chiến lược gia nhập thị trường",
      "Thành lập công ty trách nhiệm hữu hạn và công ty cổ phần",
      "Đăng ký thành lập văn phòng đại diện và chi nhánh",
      "Tư vấn và hỗ trợ thủ tục cấp phép đầu tư nước ngoài",
      "Tư vấn quản trị doanh nghiệp và cơ cấu tổ chức",
      "Hỗ trợ tuân thủ sau khi được cấp phép",
      "Thực hiện các thủ tục đăng ký kế toán và thuế ban đầu",
      "Hỗ trợ thiết lập khung pháp lý và vận hành ban đầu của doanh nghiệp",
    ],
  },
  {
    num: "06",
    title: "M&A Advisory",
    title_vn: "Tư vấn M&A",
    tag: "M&A",
    short:
      "Our integrated M&A advisory services help clients execute transactions effectively and maximize long-term value creation.",
    short_vn:
      "Dịch vụ tư vấn M&A tích hợp của chúng tôi hỗ trợ khách hàng triển khai giao dịch một cách hiệu quả, đồng thời tối đa hóa giá trị tạo ra trong dài hạn.",
    overview:
      "From strategic evaluation through post-deal integration, FINE provides practical transaction advisory services tailored to each client's objectives. We support both buy-side and sell-side transactions across multiple industries.",
    overview_vn:
      "Từ giai đoạn đánh giá chiến lược đến tích hợp sau giao dịch, FINE cung cấp các giải pháp tư vấn giao dịch mang tính thực tiễn, được thiết kế phù hợp với mục tiêu cụ thể của từng khách hàng. Chúng tôi hỗ trợ cả bên mua và bên bán trong các giao dịch thuộc nhiều lĩnh vực khác nhau.",
    bullets: [
      "Buy-side and sell-side transaction advisory",
      "Financial due diligence",
      "Business valuation and financial modeling",
      "Acquisition and takeover support",
      "Mergers, de-mergers and restructuring",
      "Capital restructuring and divestment advisory",
      "Post-merger integration support",
    ],
    bullets_vn: [
      "Tư vấn giao dịch cho bên mua và bên bán",
      "Thẩm định tài chính",
      "Định giá doanh nghiệp và xây dựng mô hình tài chính",
      "Hỗ trợ thực hiện các giao dịch mua lại và thâu tóm doanh nghiệp",
      "Tư vấn sáp nhập, chia tách và tái cấu trúc doanh nghiệp",
      "Tư vấn tái cấu trúc vốn và thoái vốn",
      "Hỗ trợ tích hợp sau sáp nhập",
    ],
  },
];

const TEAM = [
  {
    name: "Nguyen Thi My Chau",
    name_vn: "Nguyễn Thị Mỹ Châu",
    role: "Managing Partner",
    role_vn: "Giám đốc Điều hành",
    quals: "MFB, CPA · Member of VACPA",
    quals_vn: "MFB, CPA · Thành viên Hội kiểm toán viên hành nghề Việt Nam",
    years: "17+",
    photo: "assets/team/Chau.jpg",
    initials: "MC",
    email: "chauntm@fineaudit.vn",
    phone: "+84 909 692 900",
    bio:
      "With over 17 years of experience in auditing, complemented by a solid foundation in accounting, tax, and finance, Ms. Chau has led numerous large-scale audit engagements for both local and international clients. She also advises foreign investors in navigating market entry and establishing operations in Vietnam. With a dynamic and results-oriented approach, strong relationship management skills, and a firm commitment to integrity, she plays a key role in enhancing financial transparency and supporting clients' sustainable growth.",
    bio_vn:
      "Với hơn 17 năm kinh nghiệm trong lĩnh vực kiểm toán, cùng nền tảng vững chắc về kế toán, thuế và tài chính, Bà Châu đã trực tiếp dẫn dắt nhiều dự án kiểm toán quy mô lớn cho các doanh nghiệp trong và ngoài nước. Bà đồng thời hỗ trợ nhà đầu tư nước ngoài trong quá trình tiếp cận và triển khai hoạt động tại thị trường Việt Nam. Với tư duy linh hoạt, khả năng kết nối hiệu quả và đề cao tính chính trực, Bà góp phần giúp doanh nghiệp nâng cao minh bạch tài chính và định hướng phát triển bền vững.",
  },
  {
    name: "Do Thi Huong",
    name_vn: "Đỗ Thị Hường",
    role: "Vice Director",
    role_vn: "Phó Giám đốc",
    quals: "B.A, CPA · Member of VACPA",
    quals_vn: "B.A, CPA · Thành viên Hội kiểm toán viên hành nghề Việt Nam",
    years: "20+",
    photo: "assets/team/Huong.png",
    initials: "DH",
    email: "huongdt@fineaudit.vn",
    phone: "+84 91 785 1057",
    bio:
      "With a strong professional foundation in accounting and auditing and over 20 years of experience, Ms. Huong is highly trusted by clients for audit, advisory, and specialized training services. With her sharp analytical mindset and strong professional commitment, she consistently delivers effective solutions that enhance business value and support sustainable growth.",
    bio_vn:
      "Nền tảng chuyên môn vững chắc về kế toán, kiểm toán cùng hơn 20 năm kinh nghiệm, Bà Hường được khách hàng tin tưởng trong các hoạt động kiểm toán, tư vấn và đào tạo chuyên sâu. Với tư duy phân tích sắc bén và cam kết chuyên nghiệp, Bà luôn mang đến các giải pháp hiệu quả, góp phần nâng cao giá trị và sự phát triển bền vững cho doanh nghiệp.",
  },
  {
    name: "Luong Quy Hien",
    name_vn: "Lương Quý Hiền",
    role: "Audit Director",
    role_vn: "Giám đốc Kiểm toán",
    quals: "B.A, CPA · Member of VACPA",
    quals_vn: "B.A, CPA · Thành viên Hội kiểm toán viên hành nghề Việt Nam",
    years: "15+",
    photo: "assets/team/Hien.png",
    initials: "LH",
    email: "hienlq@fineaudit.vn",
    phone: "+84 93 771 9328",
    bio:
      "With over 15 years of experience in auditing, Ms. Hien has been involved in numerous audit and advisory engagements for both domestic and international clients. With strong language skills, a clear analytical mindset, and a professional working style, she consistently supports clients in ensuring regulatory compliance and enhancing operational efficiency in Vietnam.",
    bio_vn:
      "Với kinh nghiệm hơn 15 năm trong lĩnh vực kiểm toán, Bà Hiền đã tham gia nhiều hoạt động kiểm toán và tư vấn cho doanh nghiệp trong và ngoài nước. Nhờ khả năng ngôn ngữ, tư duy phân tích rõ ràng và tác phong làm việc chuyên nghiệp, Bà Hiền luôn hỗ trợ khách hàng tuân thủ quy định và nâng cao hiệu quả hoạt động tại Việt Nam.",
  },
  {
    name: "Nguyen Le Hoang Minh",
    name_vn: "Nguyễn Lê Hoàng Minh",
    role: "Advisory Director",
    role_vn: "Giám đốc Tư vấn",
    quals: "B.A",
    years: "19+",
    photo: "assets/team/Minh-framed.jpg",
    initials: "HM",
    email: "minhnlh@fineaudit.vn",
    phone: "+84 86267 1168",
    bio:
      "Mr. Minh has over 19 years of experience in the profession of corporate finance, financial advisory, tax and accounting advisory. His extensive experience affords him the ability to assist clients in maximizing tax benefits and minimizing clients' tax obligations. He also concentrates on finance management and M&A processes.",
    bio_vn:
      "Với hơn 19 năm kinh nghiệm trong lĩnh vực tài chính doanh nghiệp, tư vấn tài chính, tư vấn thuế và kế toán, Ông Minh đã đồng hành cùng nhiều doanh nghiệp trong việc tối ưu hiệu quả tài chính. Nhờ nền tảng chuyên môn sâu rộng, Ông có khả năng hỗ trợ khách hàng tối đa hóa lợi ích thuế đồng thời giảm thiểu nghĩa vụ thuế một cách hợp pháp và hiệu quả.",
  },
  {
    name: "Le Trong Dai",
    name_vn: "Lê Trọng Đãi",
    role: "Advisory Director",
    role_vn: "Giám đốc Tư vấn",
    quals: "B.A",
    years: "17+",
    photo: "assets/team/Dai-framed.jpg",
    initials: "LD",
    email: "dailt@fineaudit.vn",
    phone: "+84 97 806 0306",
    bio:
      "Mr. Dai has over 17 years of experience in accounting and tax advisory. He specializes in guiding clients on how to build and operate effective accounting systems, ensuring full compliance with tax regulations. He also provides expert advice to help clients minimize tax risks through practical and compliant solutions.",
    bio_vn:
      "Ông Đãi có hơn 17 năm kinh nghiệm trong lĩnh vực kế toán và tư vấn thuế. Ông là chuyên gia định hướng cho khách hàng cách vận hành bộ máy kế toán hiệu quả, giúp khách hàng tuân thủ các qui định về thuế và tư vấn khách hàng các biện pháp giảm thiểu rủi ro về thuế.",
  },
  {
    name: "Dang Tran Hung",
    name_vn: "Đặng Trần Hùng",
    role: "Advisory Director",
    role_vn: "Giám đốc Tư vấn",
    quals: "B.A",
    years: "17+",
    photo: "assets/team/Hung-framed.jpg",
    initials: "DH",
    email: "hungdt@fineaudit.vn",
    phone: "+84 978 377 255",
    bio:
      "Mr. Hung has over 17 years of experience in financial services, with deep expertise in due diligence, strategic corporate finance, M&A, and financial restructuring. As a senior financial expert, he has successfully supported numerous clients in attracting funding and valuable investment opportunities, contributing to their sustainable business growth.",
    bio_vn:
      "Ông Hùng có hơn 17 năm kinh nghiệm trong lĩnh vực dịch vụ tài chính, với chuyên môn sâu về soát xét thẩm định (due diligence), tài chính doanh nghiệp chiến lược, M&A, tái cấu trúc tài chính. Là chuyên gia tài chính cấp cao đã hỗ trợ rất nhiều khách hàng thu hút nguồn vốn và cơ hội đầu tư giá trị, góp phần thúc đẩy sự phát triển bền vững của doanh nghiệp.",
  },
];

const CLIENTS = [
  { name: "Kido Group", logo: "assets/clients/Kido.jpg", sector: "F&B", url: "https://www.kdc.vn/" },
  { name: "Glandcore", logo: "assets/clients/Glandcore.jpg", sector: "Trading", url: "https://glandcore.com.vn/" },
  { name: "Lautan", logo: "assets/clients/Lautan.jpg", sector: "Trading", url: "https://lautan-luas.com.vn/vi/" },
  { name: "Nipon", logo: "assets/clients/Nipon.jpg", sector: "Technology", url: "https://www.niponvietnam.com.vn/" },
  { name: "EMM", logo: "assets/clients/Emm.jpg", sector: "Industrial", url: "https://elektrim.com.vn/" },
  { name: "Tongwei Vietnam", logo: "assets/clients/Tongwei.png", sector: "Aquaculture", url: "https://www.tongwei.com/" },
  { name: "Mentfield", logo: "assets/clients/Mentfield.jpg", sector: "Logistics", url: "http://www.mentfield.com/" },
  { name: "Daco Logistics", logo: "assets/clients/Daco.jpg", sector: "Logistics", url: "https://dacologistics.com/vi/home/" },
  { name: "SDB", logo: "assets/clients/SDB.jpg", sector: "Manufacturing", url: "https://www.savinodelbene.com/company/" },
  { name: "Mass", logo: "assets/clients/Mass.jpg", sector: "Manufacturing", url: "http://www.mass.co.th/home" },
  { name: "Nankai", logo: "assets/clients/Nankai.jpg", sector: "Industrial", url: "https://www.aglc.co.jp/" },
  { name: "MZST / Molvizadah", logo: "assets/clients/Molvizadah.jpg", sector: "Industrial", url: "https://www.molvizadahsons.com/" },
  { name: "Asama", logo: "assets/clients/Asama.jpg", sector: "Industrial", url: "https://asamabike.com/" },
  { name: "Tong Hong Tannery", logo: "assets/clients/TongHong.jpg", sector: "Leather", url: "http://www.tong-hong.com/" },
  { name: "Gunzetal", logo: "assets/clients/Gunzetal.jpg", sector: "Manufacturing", url: "http://www.gunzetal.com/" },
  { name: "DreamChef", logo: "assets/clients/Dreamchef.jpg", sector: "F&B", url: "http://www.dreamchef.kr/vn/Vietnam" },
  { name: "Việt Trung", logo: "assets/clients/VietTrung.jpg", sector: "Manufacturing", url: "https://viettrung.com/" },
  { name: "Fillon Technologies", logo: "assets/clients/Fillon.jpg", sector: "Technology", url: "https://www.fillontech.com/en/corporate/homepage/" },
  { name: "Tigermed", logo: "assets/clients/Tigermed.jpg", sector: "Healthcare", url: "https://tigermedgrp.com/en/homepage" },
  { name: "Cotecna", logo: "assets/clients/Cotecna.jpg", sector: "Inspection", url: "https://www.cotecna.com/en" },
  { name: "ezFly", logo: "assets/clients/GoHappy.jpg", sector: "Travel", url: "https://ezfly.com/" },
  { name: "Gia Khải Investment", logo: "assets/clients/GiaKhai.jpg", sector: "Investment", url: "https://diaocgiakhai.vn/" },
  { name: "Bita's", logo: "assets/clients/Bitas.jpg", sector: "Footwear", url: "https://bitas.com.vn/" },
  { name: "Caritas Vietnam", logo: "assets/clients/Caritas.jpg", sector: "NGO", url: "https://caritasvietnam.org/" },
];

const STATS = [
  { num: "120+", label: "Corporate Clients", label_vn: "Khách hàng doanh nghiệp" },
  { num: "15+", label: "Countries", label_vn: "Quốc gia" },
  { num: "20", label: "Years of Experience", label_vn: "Năm kinh nghiệm" },
  { num: "6", label: "NGOs & Partners", label_vn: "Tổ chức phi chính phủ" },
];

const CONTACTS = [
  {
    name: "Ms. Nguyen Thi My Chau",
    name_vn: "Bà Nguyễn Thị Mỹ Châu",
    role: "Managing Partner",
    role_vn: "Giám đốc Điều hành",
    phone: "+84 909 692 900",
    email: "chauntm@fineaudit.vn",
  },
  {
    name: "Ms. Do Thi Huong",
    name_vn: "Bà Đỗ Thị Hường",
    role: "Vice Director",
    role_vn: "Phó Giám đốc",
    phone: "+84 91 785 1057",
    email: "huongdt@fineaudit.vn",
  },
  {
    name: "Ms. Luong Quy Hien",
    name_vn: "Bà Lương Quý Hiền",
    role: "Audit Director",
    role_vn: "Giám đốc Kiểm toán",
    phone: "+84 93 771 9328",
    email: "hienlq@fineaudit.vn",
  },
  {
    name: "Mr. Le Trong Dai",
    name_vn: "Ông Lê Trọng Đãi",
    role: "Advisory Director",
    role_vn: "Giám đốc Tư vấn",
    phone: "+84 97 806 0306",
    email: "dailt@fineaudit.vn",
  },
  {
    name: "Mr. Nguyen Le Hoang Minh",
    name_vn: "Ông Nguyễn Lê Hoàng Minh",
    role: "Advisory Director",
    role_vn: "Giám đốc Tư vấn",
    phone: "+84 86267 1168",
    email: "minhnlh@fineaudit.vn",
  },
  {
    name: "Mr. Dang Tran Hung",
    name_vn: "Ông Đặng Trần Hùng",
    role: "Advisory Director",
    role_vn: "Giám đốc Tư vấn",
    phone: "+84 978 377 255",
    email: "hungdt@fineaudit.vn",
  },
];

window.FINE_DATA = { NAV, VALUES, SERVICES, TEAM, CLIENTS, STATS, CONTACTS };
