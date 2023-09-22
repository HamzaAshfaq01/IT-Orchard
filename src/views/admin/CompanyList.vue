<template>
    <authenticator>
        <div class="position-relative">
            <!-- Navigation-->
            <AdminNavbar />
            <div class="content-wrapper">
                <div class="container-fluid">
                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/admin">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item active">Company Listing</li>
                    </ol>
                    <div class="mt-0 mb-1">
                        <h2>Company Listing</h2>
                        <div class="divider ml-0" style="width: 90px"></div>
                    </div>
                    <div v-if="screen == 'form'">
                        <form class="form-style-9" @submit.prevent="submitCompany()" id="myForm"
                            enctype="multipart/form-data" v-if="!loading">
                            <ul>
                                <li>
                                    <input type="hidden" name="id" v-if="id != 0" v-model="record.id" />
                                    <label class="custom-input-label">Comapny Name</label>
                                    <input type="text" name="companyName" required v-model="record.companyName"
                                        class="field-style field-split align-left" placeholder="Comapny Name" />
                                </li>
                                <li>
                                    <label class="custom-input-label">Comapny Location</label>
                                    <input type="text" name="location" required v-model="record.location"
                                        class="field-style field-split align-right" placeholder="Comapny Location" />
                                </li>
                                <li>
                                    <label class="custom-input-label">Comapny Hourly rate</label>
                                    <input type="text" name="ratePerHour" required v-model="record.ratePerHour"
                                        class="field-style field-split align-left" placeholder="Comapny Hourly rate" />
                                </li>
                                <li>
                                    <label class="custom-input-label">Company Employee</label>
                                    <input type="text" name="noEmployees" required v-model="record.noEmployees"
                                        class="field-style field-split align-right" placeholder="Company Employee" />
                                </li>
                                <li>
                                    <label class="custom-input-label">Industry Experience</label>
                                    <input type="text" name="industryExperience" required
                                        v-model="record.industryExperience" class="field-style field-split align-left"
                                        placeholder="industryExperience" />
                                </li>
                                <li>
                                    <label class="custom-input-label">Experties</label>
                                    <input type="text" name="experties" required v-model="record.experties"
                                        class="field-style field-split align-right" placeholder="experties" />
                                </li>
                                <li>
                                    <label class="custom-input-label">Company Date</label>
                                    <input type="date" name="foundedDate" required v-model="record.foundedDate"
                                        class="field-style field-split align-left" placeholder="foundedDate" />
                                    <!-- <input type="text" name="experties" class="field-style field-split align-right" placeholder="Company Employee" /> -->
                                </li>
                                <li>
                                    <img :src="record.imageLink" v-if="record.id != 0" style="width: 50px" />
                                    <label class="custom-input-label mb-2">Company Logo</label>
                                    <input type="file" name="image" v-if="record.id == 0" required
                                        class="field-style field-full align-none" placeholder="IT ORCHARD Point View"
                                        accept=".png, .jpg, .jpeg" />
                                    <input type="file" name="image" v-else class="field-style field-full align-none"
                                        placeholder="IT ORCHARD Point View" accept=".png, .jpg, .jpeg" />
                                </li>
                                <li>
                                    <label class="custom-input-label mb-2">Order No</label>
                                    <input type="number" v-model="record.orderNumber" name="orderNumber"
                                        class="field-style field-full align-none" placeholder="Enter Order Number" />
                                </li>
                                <li>
                                    <div class="d-flex multigallery">
                                        <div v-for="(gallery, index) in record.galleryLink" :key="index">
                                            <img :src="gallery" v-if="record.id != 0" style="width: 50px" />
                                            <a @click="deleteGalleryImg(index)" class="close-icon"><i
                                                    class="fa fa-close ml-3"></i></a>
                                        </div>
                                    </div>
                                    <label class="custom-input-label mb-2">Gallery Images</label>
                                    <input type="file" name="gallery" multiple v-if="record.id == 0" required
                                        class="field-style field-full align-none" placeholder="IT ORCHARD Point View"
                                        accept=".png, .jpg, .jpeg" />
                                    <input type="file" name="gallery" multiple v-else
                                        class="field-style field-full align-none" placeholder="IT ORCHARD Point View"
                                        accept=".png, .jpg, .jpeg" />
                                </li>
                                <li>
                                    <label class="custom-input-label mb-2">Company Description</label>
                                    <textarea name="description" required class="field-style" v-model="record.description"
                                        placeholder="Comapany Description" col="4"></textarea>
                                </li>
                                <li>
                                    <div class="d-flex align-items-center">
                                        <input type="checkbox" name="isRecommended" value="1"
                                            v-model="record.isRecommended" />
                                        <label class="mb-0 ml-2">is recommended?</label>
                                    </div>
                                </li>
                                <li>
                                    <input type="submit" value="Submit" v-if="record.id == 0" />
                                    <input type="submit" value="Update" v-else />
                                    <input @click.prevent="clearForm()" type="submit" value="Cancel" class="ml-3" />
                                </li>
                            </ul>
                        </form>
                        <BackDrop v-if="fullPageLoading" />
                    </div>
                    <div v-if="screen == 'list'">
                        <button @click="screen = 'form'" class="create-btn">
                            Create Company
                        </button>
                        <!-- loader -->
                        <div v-if="loading" class="Adminpage-loader">
                            <atom-spinner :animation-duration="1000" :size="60" :color="'#00AB55'" />
                        </div>
                        <!-- table -->
                        <table id="companylist_table" class="display" style="width: 100%" v-if="!loading">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>NO. of Employees</th>
                                    <th>Founded Date</th>
                                    <th>Experites</th>
                                    <th>Industry Experience</th>
                                    <th>Created At</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(company, index) in companies" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td><img :src="company.imageLink" style="width: 50px" /></td>
                                    <td>{{ company.id }}</td>
                                    <td>{{ company.companyName }}</td>
                                    <td>{{ company.noEmployees }}</td>
                                    <td>{{ company.foundedDate }}</td>
                                    <td>{{ company.experties }}</td>
                                    <td>{{ company.industryExperience }}</td>
                                    <td>
                                        {{ moment(company.created_at).format("MMM.DD.YYYY") }}
                                    </td>
                                    <td>
                                        <div class="d-flex">
                                            <a @click="editCompany(company)" class="edit-icon mr-3">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a data-toggle="modal" data-target="#confirmDelete"
                                                @click="setDeletedItemID(company.id, company.image)" class="trash-icon">
                                                <i class="fas fa-trash"></i>
                                            </a>
                                        </div>
                                    </td>
                                    <!-- Logout Modal-->
                                    <div class="modal fade" id="confirmDelete" tabindex="-1" role="dialog"
                                        aria-labelledby="confirmDeleteLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="confirmDeleteLabel">
                                                        Are You sure to Delete?
                                                    </h5>
                                                    <button class="close" type="button" data-dismiss="modal"
                                                        aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <!-- <div class="modal-body"> <h6> If you're prepared to remove your list, choose "Delete" below.</h6></div> -->
                                                <div class="modal-footer">
                                                    <button class="btn btn-secondary" type="button" data-dismiss="modal">
                                                        Cancel
                                                    </button>
                                                    <a @click="deleteCompany()" class="btn logout-btn"
                                                        data-dismiss="modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>NO. of Employees</th>
                                    <th>Founded Date</th>
                                    <th>Experites</th>
                                    <th>Industry Experience</th>
                                    <th>Created At</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                        <BackDrop v-if="fullPageLoading" />
                    </div>
                </div>
                <AdminFooter />
            </div>
        </div>
    </authenticator>
</template>

<script>
import {
    API,
    Auth
} from "aws-amplify";
import {
    AtomSpinner
} from "epic-spinners";
import moment from "moment";
import BackDrop from "../../components/BackDrop.vue";
export default {
    data() {
        return {
            record: {
                id: 0,
                companyName: "",
                location: "",
                ratePerHour: "",
                noEmployees: "",
                imageLink: "",
                galleryLink: [],
                galleryImages: [],
                industryExperience: "",
                experties: "",
                foundedDate: "",
                image: "",
                description: "",
                isRecommended: 0,
                orderNumber: null,
            },
            deletedItem: null,
            deletedImage: null,
            companies: [],
            screen: "list",
            loading: true, // flag to track loading state
            fullPageLoading: false,
        };
    },

    created() {
        this.moment = moment;
        this.fetchData();
    },
    components: {
        AtomSpinner,
        BackDrop,
    },
    methods: {
        setDeletedItemID(id, img) {
            this.deletedItem = id
            this.deletedImage = img
        },
        deleteGalleryImg(index) {
            this.record.galleryLink.splice(index, 1);
            this.record.galleryImages.splice(index, 1);
        },
        async submitCompany() {
            this.fullPageLoading = true;
            try {
                const form = document.getElementById("myForm");
                const formData = new FormData(form);
                console.log(this.record.orderNumber);
                if (this.record.orderNumber == null) {
                    formData.append("orderNumber", null);
                }
                formData.append(
                    "oldGallery",
                    JSON.stringify(this.record.galleryImages)
                );
                const jwtToken = await Auth.currentSession().then((session) =>
                    session.getIdToken().getJwtToken()
                );
                const requestInfo = {
                    headers: {
                        Authorization: jwtToken,
                    },
                    body: formData,
                    "Content-Type": "image/png",
                };
                if (this.record.id == 0) {
                    const response = await API.post(
                        "companyAPi",
                        "/company",
                        requestInfo
                    );
                } else {
                    const response = await API.put("companyAPi", "/company", requestInfo);
                }
                this.clearForm();
                this.fullPageLoading = false;
            } catch (error) {
                this.fullPageLoading = false;
                console.error(error);
            }
        },
        async deleteCompany() {
            this.fullPageLoading = true;
            try {
                const jwtToken = await Auth.currentSession().then((session) =>
                    session.getIdToken().getJwtToken()
                );
                const requestInfo = {
                    headers: {
                        Authorization: jwtToken,
                    },
                    body: {
                        id: this.deletedItem,
                        image: this.deletedImage,
                    },
                };
                const response = await API.post(
                    "companyAPi",
                    "/company/delete",
                    requestInfo
                );
                this.fullPageLoading = false;
                this.clearForm();
            } catch (error) {
                this.fullPageLoading = false;
                console.error(error);
            }
        },
        editCompany(item) {
            try {
                this.record.id = item.id;
                this.record.companyName = item.companyName;
                this.record.location = item.location;
                this.record.ratePerHour = item.ratePerHour;
                this.record.noEmployees = item.noEmployees;
                this.record.experties = item.experties;
                this.record.industryExperience = item.industryExperience;
                this.record.foundedDate = item.foundedDate;
                this.record.description = item.description;
                this.record.imageLink = item.imageLink;
                this.record.galleryLink = item.galleryLink;
                this.record.galleryImages = item.galleryImages;
                this.record.isRecommended = item.isRecommended;
                this.screen = "form";
            } catch (error) {
                console.error(error);
            }
        },
        async fetchData() {
            try {
                const jwtToken = await Auth.currentSession().then((session) =>
                    session.getIdToken().getJwtToken()
                );
                const requestInfo = {
                    headers: {
                        Authorization: jwtToken,
                        "Content-Type": "application/json",
                    },
                };
                const response = await API.get("companyAPi", "/company", requestInfo);
                this.companies = response;
                this.loading = false;
                this.$nextTick(() => {
                    $(document).ready(function () {
                        $("#companylist_table").DataTable();
                    });
                });
            } catch (error) {
                console.error(error);
            }
        },
        clearForm() {
            (this.record = {
                id: 0,
                companyName: "",
                location: "",
                ratePerHour: "",
                noEmployees: "",
                imageLink: "",
                industryExperience: "",
                experties: "",
                foundedDate: "",
                image: "",
                description: "",
                isRecommended: 0,
            }),
                this.fetchData();
            this.screen = "list";
        },
    },
};
</script>