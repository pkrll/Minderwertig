const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/client',
      components: {
        titlebar: null,
        submenu: null,
        main: login_email_v
      }
    },
    {
      path: '/client/wait',
      components: {
        titlebar: titlebar_v,
        submenu: null,
        main: login_load_v
      }
    },
    {
      path: '/client/order',
      name: 'order',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_form_v
      },
      meta: {
        title: 'Order (1/3)',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
    {
      path: '/client/order/wait',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_wait_v
      },
      meta: {
        title: 'Order (1/3)',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
    {
      path: '/client/order/confirmation',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_found_v
      },
      meta: {
        title: 'Order (2/3)',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
    {
      path: '/client/trips',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: trips_v
      },
      meta: {
        title: 'My trips',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
    {
      path: '/client/login/fail',
      components: {
        titlebar: null,
        submenu: null,
        main: login_fail_v
      }
    },
    {
      path: '/client/trip/',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: trip_details_v
      },
      meta: {
        title: 'Trip Details',
        hasLeftArrow: true,
        hasRightArrow: false
      }
    },
    {
      path: '/client/order/done',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_done_v
      },
      meta: {
        title: 'Order (3/3)',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
    {
      path: '/client/trip/active',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: trip_active_details_v
      },
      meta: {
        title: 'Ongoing trip',
        hasLeftArrow: true,
        hasRightArrow: false
      }
    },
    {
      path: '/client/select',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: fard_view_v
      },
      meta: {
        title: 'Select',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
    {
      path: '/client/fardtjanst',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: fard_orderform_v
      },
      meta: {
        title: 'Order (1/3)',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
  ]
});
