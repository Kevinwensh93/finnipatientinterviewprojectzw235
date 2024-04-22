class CustomFieldsController < ApplicationController
    before_action :set_patient
    before_action :set_custom_field, only: [:show, :update, :destroy]

    # GET /patients/:patient_id/custom_fields
    def index
        @custom_fields = @patient.custom_fields
        render json: @custom_fields
    end

    # GET /patients/:patient_id/custom_fields/:id
    def show
        render json: @custom_field
    end

    # POST /patients/:patient_id/custom_fields
    def create
        @custom_field = @patient.custom_fields.build(custom_field_params)
        if @custom_field.save
            render json: @custom_field, status: :created, location: [@patient, @custom_field]
        else
            render json: @custom_field.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /patients/:patient_id/custom_fields/:id
    def update
        if @custom_field.update(custom_field_params)
            render json: @custom_field
        else
            render json: @custom_field.errors, status: :unprocessable_entity
        end
    end

    # DELETE /patients/:patient_id/custom_fields/:id
    def destroy
        @custom_field.destroy
        head :no_content
    end

    private
        
    def set_patient
        @patient = Patient.find(params[:patient_id])
    end

    def set_custom_field
        @custom_field = @patient.custom_fields.find(params[:id])
    end

    def custom_field_params
        params.require(:custom_field).permit(:name, :value)
    end
end