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
- response:
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
      skills: ['node.js', 'postgres', 'react.js'],
      offer_types: ['fixed_price', 'part_time']
    }
  }
  ```

`PUT` : `/api/v1/filter/:memberId`
- request:
  ```
  {
    skills: ['node.js', 'postgres', 'react.js']
    offer_types: ['fixed_price', 'part_time']
  }
  ```
- response:
  ```
  {
    error: null,
    data: {
      member_id: 2,
      skills: ['node.js', 'postgres', 'react.js']
      offer_types: ['fixed_price', 'part_time']
    }
  }
  ```

`GET` : `/api/v1/skills/:memberId`
- response:
  ```
  {
    error: null,
    data: {
      member_id: 2,
      skills: ['node.js', 'postgres', 'react.js']
      offer_types: ['fixed_price', 'part_time']
    }
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
`GET` : `/api/v1/offer_type`
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
`POST` : `/api/v1/offer_type`
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
        // get offer details
        , skill
        , offer_type
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
        // get offer details
        , skill
        , offer_type
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
      {...data}
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
        memberId: 1,
        offerId: 2,
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
`DELETE` : `/api/v1/saved-offer/:offerId`
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
      skills: ['node.js', 'postgres'],
      offer_type: ['full_time', 'part_time'],
      member_id: 2,
      full_name: 'ahmedsh',
      avatar: 'bal/bla.jpg'
    }
  }
  ```
`POST` : `/api/v1/offers`
- body:
  ```
  data: {
      title: 'Ui application for website',
      position: 'front end developer',
      description: 'lorem ipsum',
      skills: [1, 2, 3], // skills id
      offer_type: [2,3,3],  //offer_type id
      member_id: 2,
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
`GET` : `/api/v1/my-applications/:memberId`
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
    status: pending
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
