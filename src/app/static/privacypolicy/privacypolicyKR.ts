const privacyPolicy = {
    companyName: "{companyName}",
    version: "1.0",
    effectiveDate: "2025-02-18",

    introduction: `
      {companyName}는 사용자 개인정보 보호를 매우 중요하게 생각합니다. 본 개인정보처리방침은 
      사용자가 당사 웹사이트 및 서비스 이용 중 제공하는 개인정보의 수집, 이용, 보관 및 처리에 대한 
      정책을 명확히 하기 위해 마련되었습니다. 당사는 개인정보 보호 관련 법령을 준수하며, 
      본 방침을 통해 사용자가 제공한 개인정보가 어떻게 처리되는지에 대해 안내드립니다.
    `,

    informationCollected: [
        {
            type: "아이디",
            description: "회원 가입 시 제공하는 고유 식별자"
        },
        {
            type: "비밀번호",
            description: "bcrypt 해싱 암호화 처리되어 저장됨. 사용자 인증을 위한 보안 기능."
        },
        {
            type: "닉네임",
            description: "사용자 이름으로, 서비스 내에서 표시됨"
        }
    ],

    purposeOfCollection: `
      수집된 개인정보는 사용자가 당사의 서비스에 가입하고 로그인하여 외국어 학습 데이터를 제공하고 
      맞춤형 학습 서비스를 제공하기 위한 목적으로 사용됩니다. 사용자가 제공한 개인정보를 통해 
      더 나은 학습 경험을 제공하며, 학습 데이터를 수집하여 개선된 서비스를 제공할 수 있습니다.
    `,

    dataRetention: `
      사용자의 계정 정보는 회원 탈퇴 후 1년 동안 보관되며, 이후에는 일괄적으로 1개월 이내에 
      개인정보가 삭제됩니다. 삭제된 정보는 복구할 수 없으며, 그 어떤 용도로도 사용되지 않습니다.
    `,

    thirdPartyDisclosure: `
      당사는 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 국가 기관이나 법원의 공식적인 
      요청에 의해 개인정보를 제공할 수 있습니다. 일반 사용자나 기업에 대한 개인정보 공개는 이루어지지 않습니다.
    `,

    serverAndSecurity: `
      당사는 회사의 개인 서버를 사용하여 사용자 개인정보를 안전하게 보관합니다. 
      비밀번호는 bcrypt 해싱 알고리즘을 사용하여 안전하게 암호화되어 저장됩니다. 
      개인정보 보호를 위한 다른 보안 조치들도 강화되고 있으며, 추후 서비스 확장 시에도 보안 강화가 이루어질 예정입니다.
    `,

    userRights: `
      사용자는 마이페이지를 통해 본인의 개인정보를 수정, 탈퇴, 열람할 수 있습니다. 개인정보의 수정 또는 
      삭제를 원할 경우, 마이페이지에서 쉽게 처리할 수 있으며, 필요한 경우 고객센터를 통해 추가 지원을 받을 수 있습니다.
    `,

    cookiesAndTracking: `
      당사는 로그인 시 쿠키를 사용하여 사용자 이름을 저장하고 인증합니다. 쿠키를 통해 사용자 인증 정보를 
      안전하게 유지하며, 서비스 개선을 위한 데이터를 수집할 수 있습니다. 쿠키는 사용자가 로그아웃할 때까지 
      지속적으로 유지됩니다. 추가적인 쿠키 사용은 현재 계획되지 않았습니다.
    `,

    policyChanges: `
      개인정보처리방침에 중요한 변경 사항이 있을 경우, 당사는 공지사항을 통해 변경 사항을 사용자에게 안내할 예정입니다. 
      공지사항을 통해 사용자가 개인정보 처리에 대해 적절한 정보를 제공받을 수 있도록 하겠습니다.
    `,

    contactInformation: `
        개인정보와 관련된 문의나 요청 사항이 있을 경우, 아래의 연락처로 문의해 주세요:

        이메일: contact@{companyName}.com
    `,

    legalResponsibilities: `
        당사는 사용자의 개인정보를 보호하기 위해 최선의 노력을 다하겠습니다. 
        그러나 외부의 공격이나 해킹 등 예기치 않은 사건으로 인한 정보 유출이 발생하는 경우
        최대한 신속하게 대응하겠습니다. 만약 개인정보 유출 사고가 발생할 경우,
        해당 사실을 즉시 공지하고 피해를 최소화하기 위해 노력하겠습니다.
        또한, 본 방침에 명시되지 않은 사항에 대해서는 관련 법령을 따릅니다.
    `
};

export default privacyPolicy;
