class AddressesController < ApplicationController
    before_action :set_patient
    before_action :set_address, only: [:show, :update, :destroy]
  
    # GET /patients/:patient_id/addresses
    def index
        @addresses = @patient.addresses
        render json: @addresses
    end
  
    # GET /patients/:patient_id/addresses/:id
    def show
        render json: @address
    end
  
    # POST /patients/:patient_id/addresses
    def create
        @address = @patient.addresses.build(address_params)
        if @address.save
            render json: @address, status: :created, location: [@patient, @address]
        else
            render json: @address.errors, status: :unprocessable_entity
        end
    end
  
    # PATCH/PUT /patients/:patient_id/addresses/:id
    def update
        if @address.update(address_params)
            render json: @address
        else
            render json: @address.errors, status: :unprocessable_entity
        end
    end
  
    # DELETE /patients/:patient_id/addresses/:id
    def destroy
        @address.destroy
        head :no_content
    end
  
    private
    
    def set_patient
        @patient = Patient.find(params[:patient_id])
    end

    def set_address
        @address = @patient.addresses.find(params[:id])
    end

    def address_params
        params.require(:address).permit(:line1, :line2, :city, :state, :zip, :country)
    end
end