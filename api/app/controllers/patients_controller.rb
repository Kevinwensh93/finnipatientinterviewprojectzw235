class PatientsController < ApplicationController
    before_action :set_patient, only: [:show, :update, :destroy]

    # GET /patients
    def index
        @patients = Patient.all
        render json: @patients
    end

    # GET /patients/:id
    def show
        render json: @patient
    end

    # POST /patients
    def create
        @patient = Patient.new(patient_params)
        if @patient.save
            render json: @patient, status: :created, location: @patient
        else
            render json: @patient.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /patients/:id
    def update
        if @patient.update(patient_params)
            render json: @patient
        else
            render json: @patient.errors, status: :unprocessable_entity
        end
    end

    # DELETE /patients/:id
    def destroy
        @patient.destroy
        head :no_content
    end

    private

    def set_patient

    @patient = Patient.find(params[:id])
    end

    def patient_params
        params.require(:patient).permit(:first_name, :middle_name, :last_name, :date_of_birth, :status)
    end
end