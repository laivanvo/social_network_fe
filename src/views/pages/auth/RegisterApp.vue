<template>
  <div class="row g-0" :is="layout">
    <div class="col-2"></div>
    <div class="col-8">
      <h3 class="text-center opacity-25">Register</h3>
      <form @submit.prevent="register()">
        <div class="row g-0 mb-3">
          <input
            class="form-control"
            v-model="user.last_name"
            type="text"
            placeholder="last name"
          />
        </div>
        <div class="row g-0 mb-3">
          <input
            class="form-control"
            v-model="user.first_name"
            type="text"
            placeholder="first name"
          />
        </div>
        <div class="row g-0 mb-3">
          <select name="gender" class="form-select" v-model="user.gender">
            <option value="gender"><p class="opacity-25">gender</p></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
        </div>
        <div class="row g-0 mb-3">
          <select class="form-select" v-model="user.address">
            <option value="address">address</option>
            <option value="An Giang">An Giang</option>
            <option value="Bac Giang">Bac Giang</option>
            <option value="Bac Kan">Bac Kan</option>
            <option value="Bac Lieu">Bac Lieu</option>
            <option value="Bac Ninh">Bac Ninh</option>
            <option value="Ba Ria-Vung Tau">Ba Ria-Vung Tau</option>
            <option value="Ben Tre">Ben Tre</option>
            <option value="Binh Dinh">Binh Dinh</option>
            <option value="Binh Duong">Binh Duong</option>
            <option value="Binh Phuoc">Binh Phuoc</option>
            <option value="Binh Thuan">Binh Thuan</option>
            <option value="Ca Mau">Ca Mau</option>
            <option value="Cao Bang">Cao Bang</option>
            <option value="Dac Lak">Dac Lak</option>
            <option value="Dac Nong">Dac Nong</option>
            <option value="Dien Bien">Dien Bien</option>
            <option value="Dong Nai">Dong Nai</option>
            <option value="Dong Thap">Dong Thap</option>
            <option value="Gia Lai">Gia Lai</option>
            <option value="Ha Giang">Ha Giang</option>
            <option value="Hai Duong">Hai Duong</option>
            <option value="Ha Nam">Ha Nam</option>
            <option value="Ha Tay">Ha Tay</option>
            <option value="Ha Tinh">Ha Tinh</option>
            <option value="Hau Giang">Hau Giang</option>
            <option value="Hoa Binh">Hoa Binh</option>
            <option value="Hung Yen">Hung Yen</option>
            <option value="Khanh Hoa">Khanh Hoa</option>
            <option value="Kien Giang">Kien Giang</option>
            <option value="Kon Tum">Kon Tum</option>
            <option value="Lai Chau">Lai Chau</option>
            <option value="Lam Dong">Lam Dong</option>
            <option value="Lang Son">Lang Son</option>
            <option value="Lao Cai">Lao Cai</option>
            <option value="Long An">Long An</option>
            <option value="Nam Dinh">Nam Dinh</option>
            <option value="Nghe An">Nghe An</option>
            <option value="Ninh Binh">Ninh Binh</option>
            <option value="Ninh Thuan">Ninh Thuan</option>
            <option value="Phu Tho">Phu Tho</option>
            <option value="Phu Yen">Phu Yen</option>
            <option value="Quang Binh">Quang Binh</option>
            <option value="Quang Nam">Quang Nam</option>
            <option value="Quang Ngai">Quang Ngai</option>
            <option value="Quang Ninh">Quang Ninh</option>
            <option value="Quang Tri">Quang Tri</option>
            <option value="Soc Trang">Soc Trang</option>
            <option value="Son La">Son La</option>
            <option value="Tay Ninh">Tay Ninh</option>
            <option value="Thai Binh">Thai Binh</option>
            <option value="Thai Nguyen">Thai Nguyen</option>
            <option value="Thanh Hoa">Thanh Hoa</option>
            <option value="Thua Thien-Hue">Thua Thien-Hue</option>
            <option value="Tien Giang">Tien Giang</option>
            <option value="Tra Vinh">Tra Vinh</option>
            <option value="Tuyen Quang">Tuyen Quang</option>
            <option value="Vinh Long">Vinh Long</option>
            <option value="Vinh Phuc">Vinh Phuc</option>
            <option value="Yen Bai">Yen Bai</option>
            <option value="Can Tho">Can Tho</option>
            <option value="Da Nang">Da Nang</option>
            <option value="Hai Phong">Hai Phong</option>
            <option value="Hanoi">Hanoi</option>
            <option value="Ho Chi Minh">Ho Chi Minh</option>
          </select>
          <!-- Script by hscripts.com -->
        </div>
        <div class="row g-0 mb-3">
          <div class="row g-0 mb-2">birthday</div>
          <input type="date" class="form-control" v-model="user.birthday" />
        </div>
        <div class="row g-0 mb-3">
          <input
            class="form-control"
            v-model="user.phone_number"
            type="text"
            placeholder="phone number"
          />
        </div>
        <div class="row g-0 mb-3">
          <input
            class="form-control"
            v-model="user.email"
            type="email"
            placeholder="email"
          />
        </div>
        <div class="row g-0 mb-3">
          <input
            class="form-control"
            v-model="user.password"
            type="password"
            placeholder="password"
          />
        </div>
        <div class="row g-0 mb-3">
          <input
            class="form-control"
            v-model="user.retype_password"
            type="password"
            placeholder="retype_password"
          />
        </div>
        <button type="submit" class="btn btn-primary">register</button>
      </form>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import AuthLayout from "@/views/layouts/AuthLayout.vue";

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        gender: "gender",
        phone_number: "",
        address: "address",
        email: "",
        password: "",
        retype_password: "",
        birthday: "",
      },
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout ?? AuthLayout;
    },
  },
  methods: {
    register() {
      let data = new FormData();
      data.append("first_name", this.user.first_name);
      data.append("last_name", this.user.last_name);
      data.append("gender", this.user.gender);
      data.append("phone_number", this.user.phone_number);
      data.append("address", this.user.address);
      data.append("email", this.user.email);
      data.append("password", this.user.password);
      data.append("retype_password", this.user.retype_password);
      data.append("birthday", this.user.birthday);
      BaseRequest.post("register", data)
        .then((res) => {
          console.log(res);
          window.localStorage.setItem("token", res.data.access_token);
          this.$router.push({ name: "/page" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
