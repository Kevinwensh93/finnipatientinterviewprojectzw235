class Patient < ApplicationRecord
    has_many :addresses
    has_many :custom_field_values
    enum status: { inquiry: 0, onboarding: 1, active: 2, churned: 3 }
end
