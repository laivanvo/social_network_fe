<template>
  <div class="row g-0">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#EditProfile"
    >
      Edit profile
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="EditProfile"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit profile</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="row g-0">Avatar</p>
            <div class="row g-0 d-lex justify-content-center align-items-center">
              <label
                class="col-auto"
                type="button"
                :for="'editProfile' + profile.id"
              >
                <img
                  :src="'http://localhost:8080' + profile.avatar"
                  id="avatar"
                  class="rounded-circle"
                  style="width: 250px; height: 250px"
                  alt="Cinque Terre"
                />
              </label>
            </div>
            <input
              :id="'editProfile' + profile.id"
              v-show="false"
              type="file"
              class="row g-0"
              v-on:change="onChange"
            />
            <div class="row g-0">
              <p class="col-3">Personal information</p>
              <styledLink
                type="button"
                class="col-9 text-end"
                @click="editInfo()"
                >Edit</styledLink
              >
            </div>
            <div class="row g-0" v-show="isEdit">
              <h5>Last name</h5>
              <div class="row g-0 mb-3">
                <input
                  class="form-control"
                  v-model="profile.last_name"
                  type="text"
                  placeholder="last name"
                />
              </div>
              <h5>first_name</h5>
              <div class="row g-0 mb-3">
                <input
                  class="form-control"
                  v-model="profile.first_name"
                  type="text"
                  placeholder="first name"
                />
              </div>
              <h5>gender</h5>
              <div class="row g-0 mb-3">
                <select
                  name="gender"
                  class="form-select"
                  v-model="profile.gender"
                >
                  <option value="gender">
                    <p class="opacity-25">gender</p>
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">other</option>
                </select>
              </div>
              <h5>address</h5>
              <div class="row g-0 mb-3">
                <select class="form-select" v-model="profile.address">
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
              <h5>birthday</h5>
              <div class="row g-0 mb-3">
                <input
                  type="date"
                  class="form-control"
                  v-model="profile.birthday"
                />
              </div>
              <h5>phone_number</h5>
              <div class="row g-0 mb-3">
                <input
                  class="form-control"
                  v-model="profile.phone_number"
                  type="text"
                  placeholder="phone number"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="update()"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const styledLink = styled.p`
  &:hover {
    ${() => css`
      text-decoration: underline;
      color: blue;
    `}
  }
`;
import styled, { css } from "vue-styled-components";
import BaseRequest from "@/helpers/BaseRequest";

export default {
  props: {
    profileP: {
      type: Object,
    },
  },
  components: {
    styledLink,
  },
  data() {
    return {
      isUpload: false,
      profile: {},
      file: "",
      isEdit: false,
    };
  },
  mounted() {
    this.profile = this.profileP;
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      document.getElementById("avatar").src = URL.createObjectURL(
        e.target.files[0]
      );
    },
    upload() {
      this.isUpload = true;
    },
    editInfo() {
      this.isEdit = true;
    },
    update() {
      let data = new FormData();
      data.append("first_name", this.profile.first_name);
      data.append("last_name", this.profile.last_name);
      data.append("phone_number", this.profile.phone_number);
      data.append("birthday", this.profile.birthday);
      data.append("address", this.profile.address);
      data.append("gender", this.profile.gender);
      data.append("file", this.file);
      BaseRequest.post("profiles", data)
        .then((res) => {
          this.$emit("editProfile", res.data.profile);
        })
        .catch();
    },
  },
};
</script>
