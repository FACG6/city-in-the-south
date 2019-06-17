#Back-end routes

`POST` : `/api/v1/members`

- body:
  ```
  {
    username: 'ahmedAlami123',
    email: 'ahmedalami@gmail.com',
    pass: '123321123abc$'
  }
  ```
- response: on success should return cookie in the response header and the body will be like:
  ```
  {
    error: null,
    data: {
      id: 2,
      username: 'ahmedAlami123',
      email: 'ahmedalami@gmail.com',
      avatar: 'default/url,
      full_name: null,
      bio: null,
      address: null,
      phone: null
    }
  }
  ```
  `POST` : `/api/v1/login`
- body:
  ```
  {
    username: 'fatma.o',
    pass: 'blablabla'
  }
  ```
- response: set the cookie
  ```
  {
    id: 2,
    username: 'fatma.o',
    avatar: null
  }
  ```

`GET` : `/api/v1/logout`

- response: clear cookie / delete localstorage front end
  ```
  {
    error: null,
    data: 'success'
  }
  ```

`GET` : `/api/v1/filter/:memberId`

- response:
  ```
  {
    error: null,
    data: {
      member_id:10,
      skills: [
                 {id:1, name:'javascript'},
                 {id:10, name:'Node js'},
                 {id:5, name:'Express'}
              ],
      offer_types: [
                 {id:1, name:'Full Time'} ,
                 {id:10, name:'Fixed price'}
                   ]
    }
  }
  ```

`PATCH` : `/api/v1/filter/:memberId`

- body:
  ```
  {
    skills:[
             {id:1, name:'javascript'},
             {id:10, name:'Node js'},
           ],
       offer_type: [
              {id:1, name:'Full Time'} ,
              {id:10, name:'Fixed price'}
         ]
  }
  ```
- response:
  ```
  {
    error: null,
    data: {
      member_id: 2,
     skills:[
           {id:1, name:'javascript'},
           {id:10, name:'Node js'},
             ],
       offer_type: [
            {id:1, name:'Full Time'} ,
            {id:10, name:'Fixed price'}
            ]
    }
  }
  ```

`GET` : `/api/v1/skills/:memberId`

- response:
  ```
   {
    error: null,
    data: [
            {id:1, name:'javascript'},
            {id:10, name:'Node js'},
         ]
  }
  ```

`GET` : `/api/v1/skills`

- response:
  ```
  {
    error: null,
    data: [
      { id: 1, name: 'node.js' },
      { id: 2, name: 'postgres' },
      { id: 3, name: 'react.js' }
    ]
  }
  ```
  `POST` : `/api/v1/skills`
- body:
  ```
  {
    name: 'mongodb'
  }
  ```
- response:
  ```
  {
    error: null,
    data: {
      id: 4,
      name: 'mongodb'
    }
  }
  ```
  `GET` : `/api/v1/offer-type`
- response:
  ```
  {
    error: null,
    data: [
      { id: 1, name: 'full_time' },
      { id: 2, name: 'part_time' }
    ]
  }
  ```
  `POST` : `/api/v1/offer-type`
- body:
  ```
  {
    name: 'fixed_price'
  }
  ```
- response:
  ```
  {
    error: null,
    data: {
      id: 3,
      name: 'fixed_price'
    }
  }
  ```
  `GET` : `/api/v1/offers/:offset`
  -response:
  ```
  {
    error: null,
    data: [
      {
        offers:[
                 {
                  id:2,
                  title:'offer title',
                  position: 'offer position',
                  description: 'offer description',
                  status: 'pending',
                  member_id: 5,
                 },
                 {
                  ...
                 }
        ],
        skills:[
                  { id: 1, name: 'node.js' },
                  { id: 2, name: 'postgres' },
                  { id: 3, name: 'react.js' }
               ],
        offer_type:[
                      { id: 1, name: 'full_time' },
                      { id: 2, name: 'part_time' }
                   ],
      }
    ]
  }
  ```
  `GET` : `/api/v1/my-offers/:memberId`
- response:
  ```
   {
    error: null,
    data: [
      {
        id: 3,
        status: 'completed',
        position: 'developer',
        title: 'hire someone for something',
        description: 'aaaaa',
        member_id: 5
      },
      {
        ...
      }
    ]
  }
  ```

`GET` : `/api/v1/members/:offset`

- response:
  ```
   {
    error: null,
    data: [
      {
          id: 2,
          username : 'fatma123',
          email : 'fatma@gmail.com'
          avatar : 'fatma.png'
          address: null,
          bio: null,  // from member table
          skills:  [
              {id:1, name:'javascript'},
              {id:10, name:'Node js'},
              {id:5, name:'Express'}
              ] // from member_skill table
       },
    ]
  }
  ```
  `GET` : `/api/v1/saved-offers/:memberId`
- response:
  ```
  {
    error: null
    data: [
      {
        member_id: 1,
        offer_id: 2,
        title: 'aaa',
        description: '',
        position:''
      }
    ]
  }
  ```
  `POST` : `/api/v1/saved-offers`
- body:
  ```
  {
    memberId: 1,
    offerId: 2
  }
  ```
- response:
  ```
  {
    error: null
    data: {
       memberId: 1,
       offerId: 2
    }
  }
  ```
  `DELETE` : `/api/v1/saved-offers/:memberId`
- body:
  ```
  {
    offerId: 2
  }
  ```
- response:
  ```
  {
    error: null,
    data: 'success'
  }
  ```
  `GET` : `/api/v1/offer/:offerId`
- response:
  ```
   {
    error: null,
    data: {
      id:1,
      status: 'adfd',
      title: 'Ui application for website',
      position: 'front end developer',
      description: 'lorem ipsum',
      skills: [
              {id:1, name:'javascript'},
              {id:10, name:'Node js'},
              {id:5, name:'Express'}
              ] ,//aray of objects
      offer_type: [
             {id:1, name:'Full Time'} ,
            {id:10, name:'Fixed price'}
            ] ,//array of objects
      member_id: 2,
      full_name: 'ahmedsh',
      avatar: 'bal/bla.jpg'
    }
  }
  ```
  `POST` : `/api/v1/offers`
- body:
  ```
  {
      title: 'Ui application for website',
      position: 'front end developer',
      description: 'lorem ipsum',
     skills: [
              {id:1, name:'javascript'},
              {id:10, name:'Node js'},
              {id:5, name:'Express'}
              ], // array of objects
      offerType: [
             {id:1, name:'Full Time'} ,
            {id:10, name:'Fixed price'}
            ] ,  // array of objects
      memberId: 2,
  }
  ```
- response:
  ```
  {
    error: null,
    data: {
      id:1,
      status: 'adfd',
      title: 'Ui application for website',
      position: 'front end developer',
      description: 'lorem ipsum'
    }
  }
  ```
  `DELETE` : `/api/v1/offers/:offerId`
- response:
  ```
  {
    error: null,
    data: 'success'
  }
  ```
  `GET` : `/api/v1/my-applications/:memberId?offerId=offerId`
- response:
  ```
  {
    error: null,
    data: [
      {
        member_id: 2,
        username: 'angam1116',
        full_name: 'Angham',
        avatar: 'url/avatar.jpg',
        proposal: 'lorem ipsum',
        status: null // from hired_member
      }
    ]
  }
  ```
  `GET` : `/api/v1/offer-applications/:offerId`
- response:
  ```
  {
    error: null,
    data: [
      {
        member_id: 2,
        username: 'angam1116',
        full_name: 'Angham',
        avatar: 'url/avatar.jpg',
        proposal: 'lorem ipsum',
        status: null // from hired_member
      }
    ]
  }
  ```
  `POST` : `/api/v1/applications`
- body:
  ```
  {
    member_id: 4,
    offer_id: 1,
    proposal: 'lorem ipsum'
  }
  ```
- response:
  ```
  {
    error: null,
    data:{
      member_id: 4,
      offer_id: 1,
      proposal: 'lorem ipsum'
    }
  }
  ```
  `POST` : `/api/v1/hired_member`
- body:
  ```
  {
    member_id: 1,
    offer_id: 2,
  }
  ```
- response:
  ```
  {
    error: null,
    data: {
      member_id: 1,
      offer_id: 2,
      status: pending
    }
  }
  ```
  `PATCH` : `/api/v1/hired_member/:member_id`

if body status === accepted change offer status to completed

- body:
  ```
  {
    member_id: 1,
    offer_id: 2,
    status: accepted / rejected
  }
  ```
- response:
  ```
  {
    error: null,
    data: {
      member_id: 1,
      offer_id: 2,
      status: accepted
    }
  }
  ```
